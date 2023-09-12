import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_js/extensions/fetch.dart';
import 'package:logger/logger.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_js/flutter_js.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:shelf_router/shelf_router.dart' as shelf_router;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:cryptography/cryptography.dart';


// ignore: must_be_immutable
class AppCore extends InheritedWidget {
  late String appDataDir;

  late Database db;

  static const secure = FlutterSecureStorage();

  static var logger = Logger();

  String? loadFailure;

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

    core.onMessage('hash', (query) async {
      return base64Encode((await Sha512().hash(utf8.encode(query))).bytes);
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

    // ignore: avoid_init_to_null
    dynamic manifest = null;

    try {
      manifest = jsonDecode((await http.get(Uri.parse('${basePath}/manifest.json'))).body);
    } catch (e) {
      // Offline
    }

    String? bundle;

    String? currentTag = await secure.read(key: 'tag');

    final coreFile = File(join(appDataDir, 'core'));

    String? bundleHash = await secure.read(key: 'bundleHash');

    const offline = 'and host is offline or otherwise unable to access manifest.';

    if (manifest == null && currentTag == null) {
      const message = 'core bundle is not cached $offline';

      logger.f('[Music UI] fatal: $message');
      loadFailure = 'Unable to load; $message';
    } else {
      String? currentHash;
      downloadBundle() async {
        bundle = (await http.get(Uri.parse(manifest['core']['assets']['bundle']['src']))).body;

        await secure.write(key: 'bundleHash', value: manifest['core']['tag']);

        await coreFile.writeAsString(bundle!);
      }

      if (manifest != null && (currentTag == null || currentTag != manifest['core']['tag'])) {
        await downloadBundle();
      } else {
        try {
          bundle = await coreFile.readAsString();

          currentHash = base64Encode((await Sha512().hash(utf8.encode(bundle!))).bytes);
        } catch (e) {
          // Bundle was deleted
          if (manifest == null) {
            const message = 'cached core bundle was deleted $offline';

            logger.f('[Music UI] fatal: $message');
            loadFailure = 'Unable to load; $message';
          } else {
            logger.i('[Music UI] info: core bundle was deleted, downloading Core bundle.');

            await downloadBundle();
          }
        }
      }

      if (currentHash != null && currentHash != bundleHash) {
        const tampered = 'core bundle has been tampered with';
        if (manifest == null) {
          const message = '$tampered $offline';

          logger.f('[Music UI] fatal: $message');
          loadFailure = 'Refusing to load; $message';

          bundle = null;
        } else {
          logger.w('[Music UI] warn: $tampered; you probably have a dumb virus. downloading fresh Core bundle.');

          await downloadBundle();
        }
      }

      if (bundle != null) {
        initCore(bundle!);

        if (kDebugMode) {await shelf_io.serve(
          logRequests().addHandler(Cascade().add(shelf_router.Router()..post('/', (Request req) async {
            await initCore(await utf8.decodeStream(req.read()));

            return Response(200);
          })).handler), 
          
          InternetAddress.anyIPv4, 4578
        );}
      }
    }
  }
}