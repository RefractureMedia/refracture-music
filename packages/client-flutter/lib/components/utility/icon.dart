import 'package:flutter/material.dart';

/// Copy from `assets/font/icons.json`
const icons = {
  "navigation-home": 61697,
  "navigation-library": 61698,
  "navigation-search": 61699,
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