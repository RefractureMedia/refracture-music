import 'package:flutter/material.dart';

/// Copy from `assets/font/icons.json`
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
  "player-pause": 61715,
  "player-play": 61716,
  "player-previous": 61717,
  "player-queue": 61718,
  "player-repeat": 61719,
  "player-skip": 61720,
  "player-volume-full": 61721,
  "player-volume-muted": 61722,
  "player-volume-partial": 61723
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
          fontSize: 24,
          color: active ? const Color(0xFF99ECFF) : const Color(0xFF649AA6),
        )),
      );
    } else {
      throw "Unknown point";
    }
  }
}