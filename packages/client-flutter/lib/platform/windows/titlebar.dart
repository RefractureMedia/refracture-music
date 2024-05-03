import 'dart:io';

import 'package:flutter/material.dart';

import 'package:bitsdojo_window/bitsdojo_window.dart';

enum InterfaceBrightness {
  light,
  dark,
  auto,
}

extension InterfaceBrightnessExtension on InterfaceBrightness {
  bool getIsDark(BuildContext? context) {
    if (this == InterfaceBrightness.light) return false;
    if (this == InterfaceBrightness.auto) {
      if (context == null) return true;

      return MediaQuery.of(context).platformBrightness == Brightness.dark;
    }

    return true;
  }

  Color getForegroundColor(BuildContext? context) {
    return getIsDark(context) ? Colors.white : Colors.black;
  }
}

class WindowTitleBar extends StatelessWidget {
  final InterfaceBrightness brightness;
  const WindowTitleBar({Key? key, required this.brightness}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Platform.isWindows
        ? Container(
            width: MediaQuery.of(context).size.width,
            height: 32.0,
            color: Colors.transparent,
            child: MoveWindow(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const Spacer(),
                  MinimizeWindowButton(
                    colors: WindowButtonColors(
                      iconNormal: brightness == InterfaceBrightness.light
                          ? Colors.black
                          : Colors.white,
                      iconMouseDown: brightness == InterfaceBrightness.light
                          ? Colors.black
                          : Colors.white,
                      iconMouseOver: brightness == InterfaceBrightness.light
                          ? Colors.black
                          : Colors.white,
                      normal: Colors.transparent,
                      mouseOver: brightness == InterfaceBrightness.light
                          ? Colors.black.withOpacity(0.04)
                          : Colors.white.withOpacity(0.04),
                      mouseDown: brightness == InterfaceBrightness.light
                          ? Colors.black.withOpacity(0.08)
                          : Colors.white.withOpacity(0.08),
                    ),
                  ),
                  MaximizeWindowButton(
                    colors: WindowButtonColors(
                      iconNormal: brightness == InterfaceBrightness.light
                          ? Colors.black
                          : Colors.white,
                      iconMouseDown: brightness == InterfaceBrightness.light
                          ? Colors.black
                          : Colors.white,
                      iconMouseOver: brightness == InterfaceBrightness.light
                          ? Colors.black
                          : Colors.white,
                      normal: Colors.transparent,
                      mouseOver: brightness == InterfaceBrightness.light
                          ? Colors.black.withOpacity(0.04)
                          : Colors.white.withOpacity(0.04),
                      mouseDown: brightness == InterfaceBrightness.light
                          ? Colors.black.withOpacity(0.08)
                          : Colors.white.withOpacity(0.08),
                    ),
                  ),
                  CloseWindowButton(
                    onPressed: () {
                      appWindow.close();
                    },
                    colors: WindowButtonColors(
                      iconNormal: brightness == InterfaceBrightness.light
                          ? Colors.black
                          : Colors.white,
                      iconMouseDown: brightness == InterfaceBrightness.light
                          ? Colors.black
                          : Colors.white,
                      iconMouseOver: brightness == InterfaceBrightness.light
                          ? Colors.black
                          : Colors.white,
                      normal: Colors.transparent,
                      mouseOver: brightness == InterfaceBrightness.light
                          ? Colors.black.withOpacity(0.04)
                          : Colors.white.withOpacity(0.04),
                      mouseDown: brightness == InterfaceBrightness.light
                          ? Colors.black.withOpacity(0.08)
                          : Colors.white.withOpacity(0.08),
                    ),
                  ),
                ],
              ),
            ),
          )
        : Container();
  }
}