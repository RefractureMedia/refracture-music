import 'package:flutter/material.dart';

/// Copy from `assets/font/icons.json`. Generate with `fantasticon ./icon/ --debug -g json -t ttf -o  ./font/`. svg-reorient can help fix figma shitcode.
const icons = {
    "context-edit": 61697,
    "context-local": 61698,
    "context-more": 61699,
    "context-music-notes": 61700,
    "context-peer": 61701,
    "context-select-mood": 61702,
    "detail-duration": 61703,
    "logo-audius": 61704,
    "logo-brand": 61705,
    "logo-mixcloud": 61706,
    "logo-soundcloud": 61707,
    "logo-spotify": 61708,
    "logo-tidal": 61709,
    "logo-youtube": 61710,
    "navigation-back": 61711,
    "navigation-home": 61712,
    "navigation-library": 61713,
    "navigation-search": 61714,
    "navigation-settings": 61715,
    "player-pause": 61716,
    "player-play": 61717,
    "player-previous": 61718,
    "player-queue": 61719,
    "player-repeat": 61720,
    "player-shuffle": 61721,
    "player-skip": 61722,
    "player-volume-full": 61723,
    "player-volume-muted": 61724,
    "player-volume-partial": 61725
};

class CustomIcon extends StatelessWidget {
  final String pointKey;
  
  final double size;

  final bool active;

  const CustomIcon({required this.pointKey, this.size = 24, this.active = false}) : super();

  @override
  Widget build(BuildContext context) {
    int? point = icons[pointKey];

    if (point != null) {
      return Material(
        color: Colors.transparent,
        child: Text(String.fromCharCode(point), style: TextStyle(

          fontFamily: 'Refracture Icons',
          fontSize: size,
          color: active ? const Color(0xFF99ECFF) : const Color(0xFF649AA6),
        )),
      );
    } else {
      throw "Unknown point $pointKey";
    }
  }
}