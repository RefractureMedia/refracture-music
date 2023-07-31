durationToTimestamp(int seconds) {
  String init = "${DateTime.fromMillisecondsSinceEpoch(25200000+(seconds*1000))}";

  init = init.substring(11, 19);

  init = init.replaceFirst(RegExp(r'^0'), '');
  init = init.replaceFirst(RegExp(r'^0:'), '');
  init = init.replaceFirst(RegExp(r'^0'), '');
  init = init.replaceFirst(RegExp(r'^0:'), '');

  return init;
}