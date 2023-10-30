import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
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


class DBAccess extends HttpClientInterceptor {
  final Map<String, UnitManager> unit;

  DBAccess({required this.unit});

  @override
  Future<HttpClientRequest?> beforeRequest(HttpClientRequest request) async {
    return request;
  }

  @override
  Future<HttpClientResponse?> afterResponse(HttpClientRequest request, HttpClientResponse response) async {
    return response;
  }

  @override
  Future<HttpClientResponse?> shouldInterceptRequest(HttpClientRequest request) async {
    if (request.uri.host == 'app.music') {
      var client = HttpClient();
      HttpClientRequest _request = await client.get('localhost', 5647, request.uri.path);

      print(request);

      _request.write(request);

      unit[request.uri.pathSegments[0]]!.db.execute(await utf8.decodeStream(await _request.close()));

      return _request.close();
    }
    return request.close();
  }
}

// ignore: must_be_immutable
class AppCore extends InheritedWidget {
  late String appDataDir;

  late var unit = <String, UnitManager>{};

  static const secure = FlutterSecureStorage();

  static var logger = Logger();

  String? loadFailure;

  late Mercury runtime;

  late MercuryDispatcher dispatcher;

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
    Completer<bool> loaded = Completer();

    runtime = Mercury(
      devToolsService: ChromeDevToolsService(),
      bundle: MercuryBundle.fromContent('const music = { versions: {} };'),
      onControllerCreated: (controller) {
        controller.onLoad = (controller) {

          logger.d(controller.context.dispatcher);

          dispatcher = controller.context.dispatcher!;

          loaded.complete(true);
        };
      },
      onLoadError: (error, trace) {
        logger.f(error, stackTrace: trace);

        loaded.complete(false);
      },
      onJSError: (error) {
        logger.f(error);

        loaded.complete(false);
      },
      httpClientInterceptor: DBAccess(unit: unit),
    );
    
    if (await loaded.future) {
      logger.d('hello?');
      dispatcher.subscribe('initDatabase', (init) async {
        unit[init[0].name]!.initDB(init);
      });

      dispatcher.subscribe('addPlugin', (args) async {
        final dynamic plugin = args[0];
        final List<String> index = ['plugin', ...plugin.index];

        unit[index.join('.')] = UnitManager(
          core: this,
          logger: logger,
          name: plugin.name, 
          index: index, 
          src: plugin.src,
          tag: plugin.tag,
          hash: plugin.hash,
        );

        String? errored;

        unit[index]!.loaded.future.catchError((error) {
          if (plugin.name == 'Base') {
            logger.f('[Music UI] fatal: $error');
            loadFailure = error;
          } else {
            logger.e('[Music UI] error: $error');
          }
          
          errored = error;
        });

        await unit[index]!.load();

        if (unit[index]!.bundle != null) {
          await loadRuntime();

          return { "success": true };
        }

        return { "success": false, "error": errored };
      });

      for (final unit in unit.values) {
        if (unit.bundle != null) {
          runtime.controller!.context.evaluateJavaScripts(
            'music.versions.${unit.indexPath} = ${await unit.secure.storage['databaseVersion'] ?? '0'};'
          );
          runtime.controller!.context.evaluateJavaScripts(unit.bundle!);
        }
      }
    }
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

        print('hello?');

        unit['core']!.bundle = await utf8.decodeStream(req.read());

        await loadRuntime();

        return Response(200);
      })).handler), 

      InternetAddress.anyIPv4, 4578
    );}
  }
}