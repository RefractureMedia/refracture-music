import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:logger/logger.dart';
import 'package:mercuryjs/devtools.dart';
import 'package:mercuryjs/mercuryjs.dart';
import 'package:refracture_music/app/unit_manager.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:path_provider/path_provider.dart';
import 'package:http/http.dart' as http;
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:shelf_router/shelf_router.dart' as shelf_router;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';


// ignore: must_be_immutable
class AppCore extends InheritedWidget {
  late String appDataDir;

  late var unit = <String, UnitManager>{};

  static const secure = FlutterSecureStorage();

  static var logger = Logger();

  String? loadFailure;

  late Mercury runtime;

  AppCore({
    super.key, 
    required Widget child,
  }) : super(child: child);

  @override
  bool updateShouldNotify(AppCore oldWidget) => runtime != oldWidget.runtime;
  
  static AppCore? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<AppCore>();
  }

  static AppCore of(BuildContext context) {
    final AppCore? result = maybeOf(context);
    assert(result != null, 'No AppCore found in context');
    return result!;
  }

  readSecure(String key) async {
    return await secure.read(key: key);
  }

  writeSecure(String key, String value) async {
    return await secure.write(key: key, value: value);
  }

  loadRuntime() async {
    runtime = Mercury(
      devToolsService: ChromeDevToolsService(),
      bundle: MercuryBundle.fromContent(unit['core']!.bundle!),
      onLoad: (controller) {
        print(runtime.devToolsService!.isolateServer);
      },
      onLoadError: (error, trace) {
        logger.f(error, stackTrace: trace);
      },
      onJSError: (error) {
        logger.f(error);
      },
    );

    // runtime = getJavascriptRuntime();

    // await runtime.enableFetch();

    // await runtime.enableHandlePromises();

    // runtime.onMessage('initDatabase', (init) async {
    //   unit[init.name]!.initDB(init);
    // });

    // runtime.addXhrHandler(XhrHandlerStage.preRequest, (url, method, {body, headers, response}) async {
    //   print(url);
    //   if (url.host == 'app.music') {
    //     print({
    //       url, method, body, headers, response
    //     });
    //     return XhrHandle(XhrHandleType.respond, XhtmlHttpResponseInfo(statusCode: 200, statusText: 'OK'), "");
    //   }
    //   return XhrHandle(XhrHandleType.skip);
    // });

    // runtime.onMessage('print', (message) {
    //   print(message);
    // });

    // runtime.onMessage('addPlugin', (plugin) async {
    //   final String index = ['plugin', ...plugin.index].join('.');

    //   unit[index] = UnitManager(
    //     core: this,
    //     logger: logger,
    //     name: plugin.name, 
    //     index: ['plugin', ...plugin.index], 
    //     src: plugin.src,
    //     tag: plugin.tag,
    //     hash: plugin.hash,
    //   );

    //   String? errored;

    //   unit[index]!.loaded.future.catchError((error) {
    //     if (plugin.name == 'Base') {
    //       logger.f('[Music UI] fatal: $error');
    //       loadFailure = error;
    //     } else {
    //       logger.e('[Music UI] error: $error');
    //     }
        
    //     errored = error;
    //   });

    //   await unit[index]!.load();

    //   if (unit[index]!.bundle != null) {
    //     await loadRuntime();

    //     return { "success": true };
    //   }

    //   return { "success": false, "error": errored };
    // });

    // await runtime.evaluateAsync("""var window = global = globalThis;""");

    // for (final unit in unit.values) {
    //   if (unit.bundle != null) {
    //     await runtime.evaluateAsync("""var MusicVersion = ${await unit.secure.storage['databaseVersion'] ?? '0'}');""");
    //     await runtime.evaluateAsync("""var ${unit.name};""");
    //     print(await runtime.evaluateAsync(unit.bundle!));
    //   }
    // }
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

    const basePath = 'https://github.com/refracturemedia/refracture-music/releases/latest/download';

    // ignore: avoid_init_to_null
    dynamic manifest = null;

    try {
      manifest = jsonDecode((await http.get(Uri.parse('${basePath}/manifest.json'))).body);
    } catch (e) {
      // Offline
    }

    unit['core'] = UnitManager(
      core: this, 
      logger: logger,
      name: 'Music', 
      index: ['core'], 
      src: manifest == null ? null : Uri.parse(manifest['core']['assets']['bundle']['src']),
      tag: manifest == null ? null : manifest['core']['tag'],
      hash: manifest == null ? null : manifest['core']['assets']['bundle']['hash'],
    );

    unit['core']!.loaded.future.catchError((error) {
      logger.f('[Music UI] fatal: $error');

      loadFailure = error;
    });

    await unit['core']!.load();

    if (unit['core']!.bundle != null) {
      await loadRuntime();
    }

    // TODO: The kDebugMode thing wasn't working
    if (true) {await shelf_io.serve(
      logRequests().addHandler(Cascade().add(shelf_router.Router()..post('/', (Request req) async {
        logger.d('[Music UI] debug: Core bundle loading from POST');

        unit['core']!.bundle = await utf8.decodeStream(req.read());

        await loadRuntime();

        return Response(200);
      })).handler), 

      InternetAddress.anyIPv4, 4578
    );}
  }
}