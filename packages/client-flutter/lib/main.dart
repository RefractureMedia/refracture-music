import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:refracture_music/app/core.dart';
import 'package:webf/webf.dart';

import 'views/navigation.dart';

void main() {
  HttpCacheController.mode = HttpCacheMode.NO_CACHE;
  

  runApp(AppCore(child: const MusicApp())..load());
}

class MusicApp extends StatelessWidget {
  const MusicApp() : super();

  @override
  Widget build(BuildContext context) {
    final style = GoogleFonts.inter(
      color: const Color(0xFF99ECFF),
      fontWeight: FontWeight.w500,
      fontSize: 18
    );
    final textTheme = TextTheme(
      displayLarge: style,
      displayMedium: style,
      displaySmall: style,
      headlineLarge: style,
      headlineMedium: style,
      headlineSmall: style,
      titleLarge: style,
      titleMedium: style,
      titleSmall: style,
      bodyLarge: style,
      bodyMedium: style,
      bodySmall: style,
      labelLarge: style,
      labelMedium: style,
      labelSmall: style,
    );
    return MaterialApp(
      title: 'Refracture Music',
      theme: ThemeData(
        useMaterial3: true,
        primarySwatch: Colors.cyan,
        textTheme: textTheme
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        primarySwatch: Colors.cyan,
        brightness: Brightness.dark,
        textTheme: textTheme,
      ),
      themeMode: ThemeMode.dark,
      home: const Scaffold(body: NavigationView(startPage: NavPage.home)),
      debugShowCheckedModeBanner: false,
    );
  }
}