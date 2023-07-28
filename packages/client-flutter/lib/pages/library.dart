import 'package:flutter/material.dart';

enum LibPage { tracks, playlists, albums, artists }

class LibraryPage extends StatefulWidget {
  const LibraryPage({required this.startPage}) : super();

  final LibPage startPage;

  @override
  State<LibraryPage> createState() => _LibraryPageState();
}

class _LibraryPageState extends State<LibraryPage> {
  LibPage? currentPage;

  @override
  Widget build(BuildContext context) {
    currentPage ??= widget.startPage;

    return Text("Library page: ${currentPage.runtimeType}");
  }
}