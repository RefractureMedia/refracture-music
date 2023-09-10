import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_js/extensions/fetch.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_js/flutter_js.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:shelf_router/shelf_router.dart' as shelf_router;

// ignore: must_be_immutable
class AppCore extends InheritedWidget {
  late String appDataDir;

  late Database db;

  late JavascriptRuntime core;

  AppCore({
    super.key, 
    required Widget child,
  }) : super(child: child);

  @override
  bool updateShouldNotify(AppCore oldWidget) => core != oldWidget.core;
  
  static AppCore? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<AppCore>();
  }

  static AppCore of(BuildContext context) {
    final AppCore? result = maybeOf(context);
    assert(result != null, 'No AppCore found in context');
    return result!;
  }

  initCore(String bundle) async {
    core = getJavascriptRuntime();

    await core.enableFetch();

    await core.enableHandlePromises();

    final databaseInitialized = Completer();

    core.onMessage('initDatabase', (sql) {
      db.execute(sql);

      databaseInitialized.complete();
    });

    core.onMessage('queryDatabase', (query) {
      return db.query(query);
    });

    core.onMessage('print', (message) {
      print(message);
    });

    await core.evaluateAsync("""
      var connection_data = ${json.encode({"address": "http://localhost:4829"})};
    """);

    await core.evaluateAsync(bundle);

    // await databaseInitialized.future;
  }

  Future<void> load() async {
    appDataDir = (await getApplicationSupportDirectory()).path;

    if (Platform.isWindows || Platform.isLinux) {
      // Initialize FFI
      sqfliteFfiInit();
    }
    // Change the default factory. On iOS/Android, if not using `sqlite_flutter_lib` you can forget
    // this step, it will use the sqlite version available on the system.
    databaseFactory = databaseFactoryFfi;

    db = await openDatabase(join(appDataDir, 'main.db'));

    // TODO: Add ability to run Refracture offline

    const basePath = 'https://github.com/refracturemedia/refracture-music/releases/latest/download';

    final manifest = jsonDecode((await http.get(Uri.parse('${basePath}/manifest.json'))).body);

    String bundle;

    dynamic currentTag = false;

    final tagFile = File(join(appDataDir, 'core_tag'));

    final coreFile = File(join(appDataDir, 'core'));

    try {
      currentTag = await tagFile.readAsString();
    } catch (e) {/* do nothing */}

    if (currentTag == false || currentTag != manifest['core']['tag']) {
      bundle = (await http.get(Uri.parse(manifest['core']['assets']['bundle']['src']))).body;

      await tagFile.writeAsString(manifest['core']['tag']);

      await coreFile.writeAsString(bundle);
    } else {
      bundle = await coreFile.readAsString();
    }

    initCore(bundle);

    Future<Response> updateRes(Request req) async {
      await initCore(await utf8.decodeStream(req.read()));

      return Response(200);
    }

    final cascade = Cascade().add(shelf_router.Router()..post('/', updateRes));

    if (kDebugMode) await shelf_io.serve(logRequests().addHandler(cascade.handler), InternetAddress.anyIPv4, 4578);
  }
}