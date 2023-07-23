import 'dart:async';
import 'dart:io';
import 'dart:math';
import 'package:flutter/material.dart';

import 'package:flutter_acrylic/flutter_acrylic.dart';
import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:flutter_acrylic/widgets/visual_effect_subview_container/visual_effect_subview_container.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Refracture Music',
      theme: ThemeData(
        useMaterial3: true,
        primarySwatch: Colors.cyan,
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        primarySwatch: Colors.cyan,
        brightness: Brightness.dark,
      ),
      themeMode: ThemeMode.dark,
      home: const MyHomePage(title: 'Library'),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 800,
      height: 600,
      clipBehavior: Clip.antiAlias,
      decoration: const BoxDecoration(),
      child: Stack(
        children: [
          Positioned(
            left: 0,
            top: 0,
            child: Container(
              width: 800,
              height: 600,
              decoration: const BoxDecoration(color: Color(0x19000000)),
            ),
          ),
          Positioned(
            left: 0,
            top: 26,
            child: SizedBox(
              width: 800,
              height: 574,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                    width: 800,
                    height: 574,
                    child: Stack(
                      children: [
                        Positioned(
                          left: 0,
                          top: 494,
                          child: SizedBox(
                            width: 800,
                            height: 80,
                            child: Stack(
                              children: [
                                Positioned(
                                  left: 0,
                                  top: 0,
                                  child: Container(
                                    width: 800,
                                    height: 80,
                                    decoration: const BoxDecoration(color: Color(0xFF202E30)),
                                  ),
                                ),
                                Positioned(
                                  left: 84,
                                  top: 63,
                                  child: SizedBox(
                                    width: 632,
                                    height: 5,
                                    child: Stack(
                                      children: [
                                        Positioned(
                                          left: 0,
                                          top: 0,
                                          child: Container(
                                            width: 632,
                                            height: 5,
                                            decoration: BoxDecoration(
                                              color: Colors.black.withOpacity(0.3499999940395355),
                                            ),
                                          ),
                                        ),
                                        Positioned(
                                          left: 0,
                                          top: 0,
                                          child: Container(
                                            width: 192.52,
                                            height: 5,
                                            decoration: const BoxDecoration(color: Color(0xFF99ECFE)),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                const Positioned(
                                  left: 336,
                                  top: 18,
                                  child: SizedBox(
                                    width: 127.75,
                                    height: 29,
                                    child: Stack(children: []),
                                  ),
                                ),
                                const Positioned(
                                  left: 7,
                                  top: 7,
                                  child: SizedBox(
                                    width: 211,
                                    height: 65,
                                    child: Stack(
                                      children: [
                                        Positioned(
                                          left: 158,
                                          top: 31,
                                          child: SizedBox(
                                            width: 10,
                                            height: 8,
                                            child: Stack(
                                              children: [
                                                Positioned(
                                                  left: 0,
                                                  top: 1,
                                                  child: Stack(children: []),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                        Positioned(
                                          left: 77,
                                          top: 8,
                                          child: SizedBox(
                                            width: 134,
                                            child: Text.rich(
                                              TextSpan(
                                                children: [
                                                  TextSpan(
                                                    text: 'KAFFEE',
                                                    style: TextStyle(
                                                      color: Color(0xFF99ECFE),
                                                      fontSize: 15,
                                                      fontFamily: 'Inter',
                                                      fontWeight: FontWeight.w600,
                                                    ),
                                                  ),
                                                  TextSpan(
                                                    text: '                                                ',
                                                    style: TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 15,
                                                      fontFamily: 'Inter',
                                                      fontWeight: FontWeight.w600,
                                                    ),
                                                  ),
                                                  TextSpan(
                                                    text: 'OpenMoji',
                                                    style: TextStyle(
                                                      color: Color(0xFF649AA6),
                                                      fontSize: 15,
                                                      fontFamily: 'Inter',
                                                      fontWeight: FontWeight.w600,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                        Positioned(
                                          left: 0,
                                          top: 0,
                                          child: SizedBox(
                                            width: 65,
                                            height: 65,
                                            child: Stack(
                                              children: [
                                                Positioned(
                                                  left: 6.77,
                                                  top: 18.96,
                                                  child: SizedBox(
                                                    width: 21.67,
                                                    height: 16.25,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                const Positioned(
                                  left: 729,
                                  top: 58,
                                  child: SizedBox(
                                    width: 55,
                                    height: 13,
                                    child: Text(
                                      '2:31 / 3:30',
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        color: Color(0xFF649AA6),
                                        fontSize: 10,
                                        fontFamily: 'Inter',
                                        fontWeight: FontWeight.w500,
                                      ),
                                    ),
                                  ),
                                ),
                                const Positioned(
                                  left: 665,
                                  top: 22,
                                  child: SizedBox(
                                    width: 119,
                                    child: Stack(
                                      children: [
                                        Positioned(
                                          left: 0,
                                          top: 0,
                                          child: SizedBox(
                                            width: 79.60,
                                            height: 22.51,
                                            child: Stack(
                                              children: [
                                                Positioned(
                                                  left: 0,
                                                  top: 3.22,
                                                  child: SizedBox(
                                                    width: 22.51,
                                                    height: 15.92,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        Positioned(
                          left: 93,
                          top: 12,
                          child: SizedBox(
                            width: 689,
                            height: 478,
                            child: Stack(
                              children: [
                                Positioned(
                                  left: 11,
                                  top: 0,
                                  child: SizedBox(
                                    width: 542,
                                    child: Stack(
                                      children: [
                                        Positioned(
                                          left: 126,
                                          top: 0,
                                          child: SizedBox(
                                            width: 416,
                                            height: 27,
                                            child: Stack(
                                              children: [
                                                const Positioned(
                                                  left: 91,
                                                  top: 0,
                                                  child: SizedBox(
                                                    width: 91,
                                                    height: 27,
                                                    child: Text(
                                                      'Playlists',
                                                      textAlign: TextAlign.center,
                                                      style: TextStyle(
                                                        color: Color(0xFF99ECFE),
                                                        fontSize: 20,
                                                        fontFamily: 'Inter',
                                                        fontWeight: FontWeight.w600,
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                Positioned(
                                                  left: 208,
                                                  top: 0,
                                                  child: SizedBox(
                                                    width: 91,
                                                    height: 27,
                                                    child: Text(
                                                      'Albums',
                                                      textAlign: TextAlign.center,
                                                      style: TextStyle(
                                                        color: Colors.black.withOpacity(0.3499999940395355),
                                                        fontSize: 20,
                                                        fontFamily: 'Inter',
                                                        fontWeight: FontWeight.w600,
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                Positioned(
                                                  left: 325,
                                                  top: 0,
                                                  child: SizedBox(
                                                    width: 91,
                                                    height: 27,
                                                    child: Text(
                                                      'Artists',
                                                      textAlign: TextAlign.center,
                                                      style: TextStyle(
                                                        color: Colors.black.withOpacity(0.3499999940395355),
                                                        fontSize: 20,
                                                        fontFamily: 'Inter',
                                                        fontWeight: FontWeight.w600,
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                Positioned(
                                                  left: 0,
                                                  top: 0,
                                                  child: SizedBox(
                                                    width: 71,
                                                    height: 27,
                                                    child: Text(
                                                      'Tracks',
                                                      textAlign: TextAlign.center,
                                                      style: TextStyle(
                                                        color: Colors.black.withOpacity(0.3499999940395355),
                                                        fontSize: 20,
                                                        fontFamily: 'Inter',
                                                        fontWeight: FontWeight.w600,
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                Positioned(
                                  left: 0,
                                  top: 45,
                                  child: SizedBox(
                                    width: 689,
                                    height: 433,
                                    child: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      crossAxisAlignment: CrossAxisAlignment.center,
                                      children: [
                                        Expanded(
                                          child: SizedBox(
                                            height: double.infinity,
                                            child: Stack(
                                              children: [
                                                Positioned(
                                                  left: 0,
                                                  top: 95,
                                                  child: SizedBox(
                                                    width: 689,
                                                    height: 338,
                                                    child: Stack(
                                                      children: [
                                                        Positioned(
                                                          left: 0,
                                                          top: 290,
                                                          child: SizedBox(
                                                            width: 689,
                                                            height: 48,
                                                            child: Column(
                                                              mainAxisSize: MainAxisSize.min,
                                                              mainAxisAlignment: MainAxisAlignment.start,
                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                              children: [
                                                                const SizedBox(
                                                                  width: 38,
                                                                  height: 48,
                                                                  child: Text(
                                                                    '3:30',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 143,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'dolor sit amet    ',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 116,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'Lorem ipsum',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF99ECFE),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                Container(
                                                                  width: 36,
                                                                  height: 35,
                                                                  decoration: const BoxDecoration(
                                                                    image: DecorationImage(
                                                                      image: NetworkImage("https://via.placeholder.com/36x35"),
                                                                      fit: BoxFit.fill,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 185,
                                                                  height: 30,
                                                                  child: Text(
                                                                    'consectetur adipiscing',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                        Positioned(
                                                          left: 0,
                                                          top: 242,
                                                          child: SizedBox(
                                                            width: 689,
                                                            height: 48,
                                                            child: Column(
                                                              mainAxisSize: MainAxisSize.min,
                                                              mainAxisAlignment: MainAxisAlignment.start,
                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                              children: [
                                                                const SizedBox(
                                                                  width: 38,
                                                                  height: 48,
                                                                  child: Text(
                                                                    '3:30',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 143,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'dolor sit amet    ',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 116,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'Lorem ipsum',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF99ECFE),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                Container(
                                                                  width: 36,
                                                                  height: 35,
                                                                  decoration: const BoxDecoration(
                                                                    image: DecorationImage(
                                                                      image: NetworkImage("https://via.placeholder.com/36x35"),
                                                                      fit: BoxFit.fill,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 185,
                                                                  height: 30,
                                                                  child: Text(
                                                                    'consectetur adipiscing',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                        Positioned(
                                                          left: 0,
                                                          top: 194,
                                                          child: SizedBox(
                                                            width: 689,
                                                            height: 48,
                                                            child: Column(
                                                              mainAxisSize: MainAxisSize.min,
                                                              mainAxisAlignment: MainAxisAlignment.start,
                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                              children: [
                                                                const SizedBox(
                                                                  width: 38,
                                                                  height: 48,
                                                                  child: Text(
                                                                    '3:30',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 143,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'dolor sit amet    ',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 116,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'Lorem ipsum',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF99ECFE),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                Container(
                                                                  width: 36,
                                                                  height: 35,
                                                                  decoration: const BoxDecoration(
                                                                    image: DecorationImage(
                                                                      image: NetworkImage("https://via.placeholder.com/36x35"),
                                                                      fit: BoxFit.fill,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 185,
                                                                  height: 30,
                                                                  child: Text(
                                                                    'consectetur adipiscing',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                        Positioned(
                                                          left: 0,
                                                          top: 145,
                                                          child: SizedBox(
                                                            width: 689,
                                                            height: 48,
                                                            child: Column(
                                                              mainAxisSize: MainAxisSize.min,
                                                              mainAxisAlignment: MainAxisAlignment.start,
                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                              children: [
                                                                const SizedBox(
                                                                  width: 38,
                                                                  height: 48,
                                                                  child: Text(
                                                                    '3:30',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 143,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'dolor sit amet    ',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 116,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'Lorem ipsum',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF99ECFE),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                Container(
                                                                  width: 36,
                                                                  height: 35,
                                                                  decoration: const BoxDecoration(
                                                                    image: DecorationImage(
                                                                      image: NetworkImage("https://via.placeholder.com/36x35"),
                                                                      fit: BoxFit.fill,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 185,
                                                                  height: 30,
                                                                  child: Text(
                                                                    'consectetur adipiscing',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                        Positioned(
                                                          left: 0,
                                                          top: 97,
                                                          child: SizedBox(
                                                            width: 689,
                                                            height: 48,
                                                            child: Column(
                                                              mainAxisSize: MainAxisSize.min,
                                                              mainAxisAlignment: MainAxisAlignment.start,
                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                              children: [
                                                                const SizedBox(
                                                                  width: 38,
                                                                  height: 48,
                                                                  child: Text(
                                                                    '3:30',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 143,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'dolor sit amet    ',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 116,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'Lorem ipsum',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF99ECFE),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                Container(
                                                                  width: 36,
                                                                  height: 35,
                                                                  decoration: const BoxDecoration(
                                                                    image: DecorationImage(
                                                                      image: NetworkImage("https://via.placeholder.com/36x35"),
                                                                      fit: BoxFit.fill,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 185,
                                                                  height: 30,
                                                                  child: Text(
                                                                    'consectetur adipiscing',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                        Positioned(
                                                          left: 0,
                                                          top: 49,
                                                          child: SizedBox(
                                                            width: 689,
                                                            height: 48,
                                                            child: Column(
                                                              mainAxisSize: MainAxisSize.min,
                                                              mainAxisAlignment: MainAxisAlignment.start,
                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                              children: [
                                                                const SizedBox(
                                                                  width: 38,
                                                                  height: 48,
                                                                  child: Text(
                                                                    '3:30',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 143,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'dolor sit amet    ',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 116,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'Lorem ipsum',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF99ECFE),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                Container(
                                                                  width: 36,
                                                                  height: 35,
                                                                  decoration: const BoxDecoration(
                                                                    image: DecorationImage(
                                                                      image: NetworkImage("https://via.placeholder.com/36x35"),
                                                                      fit: BoxFit.fill,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 185,
                                                                  height: 30,
                                                                  child: Text(
                                                                    'consectetur adipiscing',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                        Positioned(
                                                          left: 0,
                                                          top: 0,
                                                          child: SizedBox(
                                                            width: 689,
                                                            height: 48,
                                                            child: Column(
                                                              mainAxisSize: MainAxisSize.min,
                                                              mainAxisAlignment: MainAxisAlignment.start,
                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                              children: [
                                                                const SizedBox(
                                                                  width: 38,
                                                                  height: 48,
                                                                  child: Text(
                                                                    '3:30',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 143,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'dolor sit amet    ',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 116,
                                                                  height: 48,
                                                                  child: Text(
                                                                    'Lorem ipsum',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF99ECFE),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                                Container(
                                                                  width: 36,
                                                                  height: 35,
                                                                  decoration: const BoxDecoration(
                                                                    image: DecorationImage(
                                                                      image: NetworkImage("https://via.placeholder.com/36x35"),
                                                                      fit: BoxFit.fill,
                                                                    ),
                                                                  ),
                                                                ),
                                                                const SizedBox(
                                                                  width: 185,
                                                                  height: 30,
                                                                  child: Text(
                                                                    'consectetur adipiscing',
                                                                    textAlign: TextAlign.center,
                                                                    style: TextStyle(
                                                                      color: Color(0xFF649AA6),
                                                                      fontSize: 16,
                                                                      fontFamily: 'Inter',
                                                                      fontWeight: FontWeight.w600,
                                                                    ),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ),
                                                Positioned(
                                                  left: 0,
                                                  top: 0,
                                                  child: SizedBox(
                                                    width: 689,
                                                    height: 78,
                                                    child: Stack(
                                                      children: [
                                                        Positioned(
                                                          left: 535,
                                                          top: 47,
                                                          child: SizedBox(
                                                            width: 153,
                                                            height: 24,
                                                            child: Stack(
                                                              children: [
                                                                Positioned(
                                                                  left: 129,
                                                                  top: 0,
                                                                  child: SizedBox(
                                                                    width: 24,
                                                                    height: 24,
                                                                    child: Stack(
                                                                      children: [
                                                                        Positioned(
                                                                          left: 0,
                                                                          top: 0,
                                                                          child: Container(
                                                                            width: 24,
                                                                            height: 24,
                                                                            decoration: ShapeDecoration(
                                                                              color: const Color(0xFF008867),
                                                                              shape: RoundedRectangleBorder(
                                                                                borderRadius: BorderRadius.circular(36),
                                                                              ),
                                                                            ),
                                                                          ),
                                                                        ),
                                                                        const Positioned(
                                                                          left: 4.91,
                                                                          top: 2.86,
                                                                          child: SizedBox(
                                                                            width: 14.23,
                                                                            height: 18.11,
                                                                            child: Stack(
                                                                              children: [
                                                                                Positioned(
                                                                                  left: 3.09,
                                                                                  top: 5.91,
                                                                                  child: SizedBox(
                                                                                    width: 8.33,
                                                                                    height: 3.63,
                                                                                  ),
                                                                                ),
                                                                                Positioned(
                                                                                  left: 0,
                                                                                  top: 0,
                                                                                  child: SizedBox(
                                                                                    width: 14.05,
                                                                                    height: 17.77,
                                                                                    child: Stack(
                                                                                      children: [
                                                                                        Positioned(
                                                                                          left: 3.09,
                                                                                          top: 5.84,
                                                                                          child: SizedBox(
                                                                                            width: 8.33,
                                                                                            height: 3.63,
                                                                                          ),
                                                                                        ),
                                                                                      ],
                                                                                    ),
                                                                                  ),
                                                                                ),
                                                                              ],
                                                                            ),
                                                                          ),
                                                                        ),
                                                                      ],
                                                                    ),
                                                                  ),
                                                                ),
                                                                const Positioned(
                                                                  left: 0,
                                                                  top: 5,
                                                                  child: SizedBox(
                                                                    width: 116,
                                                                    height: 13,
                                                                    child: Text(
                                                                      'Snowboarder1337',
                                                                      textAlign: TextAlign.center,
                                                                      style: TextStyle(
                                                                        color: Color(0xFF649AA6),
                                                                        fontSize: 12,
                                                                        fontFamily: 'Inter',
                                                                        fontWeight: FontWeight.w600,
                                                                      ),
                                                                    ),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                        const Positioned(
                                                          left: 575,
                                                          top: 12,
                                                          child: SizedBox(
                                                            width: 114,
                                                            height: 13,
                                                            child: Stack(
                                                              children: [
                                                                Positioned(
                                                                  left: 0,
                                                                  top: 0,
                                                                  child: SizedBox(
                                                                    width: 27,
                                                                    height: 13,
                                                                    child: Text(
                                                                      '24',
                                                                      textAlign: TextAlign.center,
                                                                      style: TextStyle(
                                                                        color: Color(0xFF649AA6),
                                                                        fontSize: 12,
                                                                        fontFamily: 'Inter',
                                                                        fontWeight: FontWeight.w600,
                                                                      ),
                                                                    ),
                                                                  ),
                                                                ),
                                                                Positioned(
                                                                  left: 65,
                                                                  top: 0,
                                                                  child: SizedBox(
                                                                    width: 42,
                                                                    height: 13,
                                                                    child: Text(
                                                                      '2 hrs',
                                                                      textAlign: TextAlign.center,
                                                                      style: TextStyle(
                                                                        color: Color(0xFF649AA6),
                                                                        fontSize: 12,
                                                                        fontFamily: 'Inter',
                                                                        fontWeight: FontWeight.w600,
                                                                      ),
                                                                    ),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                        const Positioned(
                                                          left: 92,
                                                          top: 49,
                                                          child: SizedBox(
                                                            width: 143,
                                                            height: 22,
                                                          ),
                                                        ),
                                                        Positioned(
                                                          left: 0,
                                                          top: 0,
                                                          child: SizedBox(
                                                            width: 189,
                                                            height: 78,
                                                            child: Stack(
                                                              children: [
                                                                const Positioned(
                                                                  left: 82,
                                                                  top: 8,
                                                                  child: SizedBox(
                                                                    width: 107,
                                                                    height: 27,
                                                                    child: Stack(
                                                                      children: [
                                                                        Positioned(
                                                                          left: 97,
                                                                          top: 10,
                                                                          child: SizedBox(
                                                                            width: 10,
                                                                            height: 8,
                                                                            child: Column(
                                                                              mainAxisSize: MainAxisSize.min,
                                                                              mainAxisAlignment: MainAxisAlignment.start,
                                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                                            ),
                                                                          ),
                                                                        ),
                                                                        Positioned(
                                                                          left: 0,
                                                                          top: 0,
                                                                          child: SizedBox(
                                                                            width: 91,
                                                                            height: 27,
                                                                            child: Text(
                                                                              'KAFFEE',
                                                                              textAlign: TextAlign.center,
                                                                              style: TextStyle(
                                                                                color: Color(0xFF99ECFE),
                                                                                fontSize: 20,
                                                                                fontFamily: 'Inter',
                                                                                fontWeight: FontWeight.w600,
                                                                              ),
                                                                            ),
                                                                          ),
                                                                        ),
                                                                      ],
                                                                    ),
                                                                  ),
                                                                ),
                                                                Positioned(
                                                                  left: 0,
                                                                  top: 0,
                                                                  child: Container(
                                                                    width: 80,
                                                                    height: 78,
                                                                    decoration: const BoxDecoration(
                                                                      image: DecorationImage(
                                                                        image: NetworkImage("https://via.placeholder.com/80x78"),
                                                                        fit: BoxFit.fill,
                                                                      ),
                                                                    ),
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        Positioned(
                          left: 0,
                          top: 0,
                          child: SizedBox(
                            width: 75,
                            height: 287,
                            child: Stack(
                              children: [
                                Positioned(
                                  left: 16,
                                  top: 217,
                                  child: SizedBox(
                                    width: 24,
                                    height: 52,
                                    child: Stack(
                                      children: [
                                        Positioned(
                                          left: 0,
                                          top: 0,
                                          child: SizedBox(
                                            width: 24,
                                            height: 24,
                                            child: Stack(
                                              children: [
                                                Positioned(
                                                  left: 0,
                                                  top: 0,
                                                  child: Container(
                                                    width: 24,
                                                    height: 24,
                                                    decoration: ShapeDecoration(
                                                      color: const Color(0xFF008867),
                                                      shape: RoundedRectangleBorder(
                                                        borderRadius: BorderRadius.circular(36),
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                                const Positioned(
                                                  left: 4.91,
                                                  top: 2.86,
                                                  child: SizedBox(
                                                    width: 14.23,
                                                    height: 18.11,
                                                    child: Stack(
                                                      children: [
                                                        Positioned(
                                                          left: 3.09,
                                                          top: 5.91,
                                                          child: SizedBox(
                                                            width: 8.33,
                                                            height: 3.63,
                                                          ),
                                                        ),
                                                        Positioned(
                                                          left: 0,
                                                          top: 0,
                                                          child: SizedBox(
                                                            width: 14.05,
                                                            height: 17.77,
                                                            child: Stack(
                                                              children: [
                                                                Positioned(
                                                                  left: 3.09,
                                                                  top: 5.84,
                                                                  child: SizedBox(
                                                                    width: 8.33,
                                                                    height: 3.63,
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                const Positioned(
                                  left: 19,
                                  top: 84,
                                  child: SizedBox(
                                    width: 20,
                                    height: 84,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            left: 0,
            top: 0,
            child: SizedBox(
              width: 800,
              height: 61,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                    width: 800,
                    height: 61,
                    child: Stack(
                      children: [
                        Positioned(
                          left: 0,
                          top: 0,
                          child: Container(
                            width: 800,
                            height: 26,
                            decoration: const BoxDecoration(color: Color(0xFF202E30)),
                          ),
                        ),
                        const Positioned(
                          left: 19,
                          top: 30,
                          child: SizedBox(
                            width: 29.05,
                            height: 31,
                            child: Stack(
                              children: [
                                Positioned(
                                  left: 0,
                                  top: 0,
                                  child: SizedBox(
                                    width: 29.05,
                                    height: 31,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        Positioned(
                          left: 693,
                          top: 8,
                          child: Container(
                            width: 91,
                            height: 9,
                            decoration: const BoxDecoration(
                              image: DecorationImage(
                                image: NetworkImage("https://via.placeholder.com/91x9"),
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

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