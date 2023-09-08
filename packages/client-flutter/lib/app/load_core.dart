import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_js/flutter_js.dart';

Future<void> load() async {
  final appData = (await getApplicationSupportDirectory()).path;

  if (Platform.isWindows || Platform.isLinux) {
    // Initialize FFI
    sqfliteFfiInit();
  }
  // Change the default factory. On iOS/Android, if not using `sqlite_flutter_lib` you can forget
  // this step, it will use the sqlite version available on the system.
  databaseFactory = databaseFactoryFfi;

  final db = await openDatabase(join(appData, 'main.db'));

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

  final core = getJavascriptRuntime();

  await core.evaluateAsync(bundle);

  initDatabase() async {

    final c = Completer();

    core.onMessage('initDatabase', (sql) {
      db.execute(sql);

      c.complete();
    });

    return c.future;
  }

  //await initDatabase();
  initDatabase();

  core.onMessage('queryDatabase', (query) {
    return db.query(query);
  });

  print(core);
}