import 'package:flutter/material.dart';
import 'package:refracture_music/content/library/albums.dart';
import 'package:refracture_music/content/library/artists.dart';
import 'package:refracture_music/content/library/playlists.dart';
import 'package:refracture_music/content/library/tracks.dart';

enum LibPage { tracks, playlists, albums, artists }

class LibraryPage extends StatefulWidget {
  const LibraryPage({required this.startPage}) : super();

  final LibPage startPage;

  @override
  State<LibraryPage> createState() => _LibraryPageState();
}

class _LibraryPageState extends State<LibraryPage> {
  LibPage? currentPage;

  LibPage? hoverPage;

  @override
  Widget build(BuildContext context) {
    currentPage ??= widget.startPage;

    capitalize(String s) {
      return "${s[0].toUpperCase()}${s.substring(1)}";
    }

    final subtext = Theme.of(context).textTheme.bodySmall?.apply(color: const Color(0xFF649AA6));

    late StatelessWidget page;

    switch (currentPage) {
      case LibPage.tracks: page = const ContentTracks();
      case LibPage.playlists: page = const ContentPlaylists();
      case LibPage.albums: page = const ContentAlbums();
      case LibPage.artists: page = const ContentArtists();
      default:
    }
    
    return SizedBox(
      width: MediaQuery.of(context).size.width-140,
      child: Column(children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ...LibPage.values.map((e) { return MouseRegion(

              onEnter: (ev) { setState(() { hoverPage = e; }); },
              onExit: (ev) { setState(() { hoverPage = null; }); },
              child: GestureDetector(
                onTap: () {
                  setState(() { currentPage = e; });
                },
                child: Text( // TODO: Fix screwy styling (wtf)
                  "     ${capitalize(e.name)}     ",
                  style: ((e == currentPage) || (e == hoverPage)) ? null : subtext,
                )
              )
            ); }),
          ],
        ),
        const SizedBox(height: 20),
        Align(
          alignment: Alignment.topLeft,
          child: SizedBox(
            height: MediaQuery.of(context).size.height-175, 
            child: SingleChildScrollView(child: page)
          )
        ),
      ]),
    );
  }
}