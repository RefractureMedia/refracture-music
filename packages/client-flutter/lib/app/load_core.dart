import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter_js/extensions/fetch.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_js/flutter_js.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:shelf_router/shelf_router.dart' as shelf_router;

class AppCore {
  late String appData;

  late Database db;

  late JavascriptRuntime core;

  Future<void> load() async {
    appData = (await getApplicationSupportDirectory()).path;

    if (Platform.isWindows || Platform.isLinux) {
      // Initialize FFI
      sqfliteFfiInit();
    }
    // Change the default factory. On iOS/Android, if not using `sqlite_flutter_lib` you can forget
    // this step, it will use the sqlite version available on the system.
    databaseFactory = databaseFactoryFfi;

    db = await openDatabase(join(appData, 'main.db'));

    // TODO: Add ability to run Refracture offline

    const basePath = 'https://github.com/refracturemedia/refracture-music/releases/latest/download';

    final manifest = jsonDecode((await http.get(Uri.parse('${basePath}/manifest.json'))).body);

    String bundle;

    dynamic currentTag = false;

    final tagFile = File(join(appData, 'core_tag'));

    final coreFile = File(join(appData, 'core'));

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

    connectionData() async {
      await core.evaluateAsync("""
        var connection_data = ${json.encode({"address": "http://localhost:4829"})};
      """);
    }

    await connectionData();

    await core.evaluateAsync(bundle);

    // await databaseInitialized.future;

    Future<Response> updateRes(Request req) async {
      print('a');
      core.dispose();

      core = getJavascriptRuntime();

      await connectionData();

      final test = await utf8.decodeStream(req.read());

      await core.evaluateAsync(test);

      return Response(200);
    }

    final cascade = Cascade().add(shelf_router.Router()..post('/', updateRes));

    // TODO: Set this to false before every release
    if (true) await shelf_io.serve(logRequests().addHandler(cascade.handler), InternetAddress.anyIPv4, 4578);
  }
}