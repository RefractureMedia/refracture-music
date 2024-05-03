import 'package:path/path.dart';

durationToTimestamp(int seconds) {
  String init = "${DateTime.fromMillisecondsSinceEpoch(25200000+(seconds*1000))}";

  init = init.substring(11, 19);

  init = init.replaceFirst(RegExp(r'^0'), '');
  init = init.replaceFirst(RegExp(r'^0:'), '');
  init = init.replaceFirst(RegExp(r'^0'), '');
  init = init.replaceFirst(RegExp(r'^0:'), '');

  return init;
}

capitalize(String s) {
  return "${s[0].toUpperCase()}${s.substring(1)}";
}

joined(List<String> paths) {
  String out = paths[0];
  for (final path in paths.skip(1)) {
    out = join(out, path);
  }
  return out;
}