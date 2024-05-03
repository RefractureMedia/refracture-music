
import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:cryptography/cryptography.dart';
import 'package:logger/logger.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'package:http/http.dart' as http;

import 'package:refracture_music/app/core.dart';
import 'package:refracture_music/util/main.dart';

class SecureStorage {
  final AppCore core;

  final String key;

  late dynamic storage;

  load() async {
    final raw = await core.readSecure(key);

    storage = raw == null ? {} : jsonDecode(raw);
  }

  save() async {
    await core.writeSecure(key, jsonEncode(storage));
  }

  SecureStorage({required this.core, required this.key});
}

class UnitManager {
  final AppCore core;

  final Logger logger;

  final String name;

  final List<String> index;

  final Uri? src;

  final String? tag;

  final String? hash;

  late SecureStorage secure;

  late String indexPath;

  late File file;

  String? bundle;

  late Database db;

  final loaded = Completer();

  UnitManager({required this.core, required this.logger, required this.name, required this.index, required this.src, required this.tag, required this.hash}) {
    indexPath = joined([core.appDataDir, 'unit', ...index]);

    file = File(joined([indexPath, 'bundle.js']));
  }

  initDB(dynamic init) async {
    if (init.sql) {
      await db.execute(init.sql);

      secure.storage['databaseVersion'] = init.version;

      await secure.save();
    }

    loaded.complete();
  }

  load() async {
    db = await openDatabase(joined([indexPath, 'storage.db']));

    secure = SecureStorage(core: core, key: index.join('.'));

    await secure.load();

    const offline = 'and host is offline or otherwise unable to access manifest.';

    if (src == null && secure.storage['tag'] == null) {
      loaded.completeError('${index.join(' ')} bundle is not cached $offline');
    } else {
      String? currentHash;

      downloadBundle() async {
        bundle = (await http.get(src!)).body;

        // TODO: If the Unit is not trusted, hash the bundle and check with Hypervisor first.

        secure.storage['tag'] = tag;
        
        secure.storage['hash'] = hash;

        await file.writeAsString(bundle!);
      }

      if (src != null && (tag == null || secure.storage['tag'] != tag)) {
        await downloadBundle();
      } else {
        try {
          bundle = await file.readAsString();

          currentHash = base64Encode((await Sha512().hash(utf8.encode(bundle!))).bytes);
        } catch (e) {
          // Bundle was deleted
          if (src == null) {
            loaded.completeError('cached core bundle was deleted $offline');
          } else {
            logger.i('[Music UI] info: core bundle was deleted, downloading Core bundle.');

            await downloadBundle();
          }
        }
      }

      if (currentHash != null && currentHash != secure.storage['hash']) {
        const tampered = 'core bundle has been tampered with';
        if (src == null) {
          loaded.completeError('$tampered $offline');
        } else {
          logger.w('[Music UI] warn: $tampered; you probably have a dumb virus. downloading fresh Core bundle.');

          await downloadBundle();
        }
      }
    }

    await secure.save();
  }
}