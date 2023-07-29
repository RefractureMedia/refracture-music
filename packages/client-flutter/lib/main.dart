import 'package:flutter/material.dart';

import 'views/navigation.dart';

void main() {
  runApp(const MusicApp());
}

class MusicApp extends StatelessWidget {
  const MusicApp() : super();

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
      home: const Scaffold(body: NavigationView(startPage: NavPage.home)),
      debugShowCheckedModeBanner: false,
    );
  }
}