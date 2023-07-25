import 'package:flutter/material.dart';

import 'views/navigation.dart';

void main() {
  runApp(const MusicApp());
}

class MusicApp extends StatelessWidget {
  const MusicApp({Key? key}) : super(key: key);

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
      home: const NavigationView(title: 'Library'),
      debugShowCheckedModeBanner: false,
    );
  }
}