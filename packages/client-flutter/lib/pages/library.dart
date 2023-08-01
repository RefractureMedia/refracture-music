import 'package:flutter/material.dart';
import 'package:refracture_music/content/item/album.dart';
import 'package:refracture_music/content/library/albums.dart';
import 'package:refracture_music/content/library/artists.dart';
import 'package:refracture_music/content/library/playlists.dart';
import 'package:refracture_music/content/library/tracks.dart';

import '../content/item/playlist.dart';
import '../util/main.dart';

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

  String? subPage;

  @override
  Widget build(BuildContext context) {
    currentPage ??= widget.startPage;

    final subtext = Theme.of(context).textTheme.bodySmall?.apply(color: const Color(0xFF649AA6));

    late StatelessWidget page;

    late double contentWidth = MediaQuery.of(context).size.width-140;

    switch (currentPage) {
      case LibPage.tracks: page = const ContentTracks();
      case LibPage.playlists: {
        if (subPage == null) {
          page = ContentPlaylists(contentWidth: contentWidth, openPlaylist: (String id) { setState(() { subPage = id; }); });
        } else {
          page = ContentPlaylist(playlist: "$subPage"); // Shut up flutter
        }
      }
      case LibPage.albums: {
        if (subPage == null) {
          page = ContentAlbums(contentWidth: contentWidth, openAlbum: (String id) { setState(() { subPage = id; }); });
        } else {
          page = ContentAlbum(album: "$subPage"); // Shut up flutter
        }
      }
      case LibPage.artists: {
        if (subPage == null) {
          page = ContentArtists(contentWidth: contentWidth, openArtist: (String id) { setState(() { subPage = id; }); });
        } else {
          // page = ContentArtist(artist: "$subPage"); // Shut up flutter
        }
      }
      default:
    }
    
    return SizedBox(
      width: contentWidth,
      child: Column(children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ...LibPage.values.map((e) { return MouseRegion(

              onEnter: (ev) { setState(() { hoverPage = e; }); },
              onExit: (ev) { setState(() { hoverPage = null; }); },
              child: GestureDetector(
                onTap: () {
                  setState(() {
                    currentPage = e;
                    subPage = null;
                  });
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
            child: page,
          )
        ),
      ]),
    );
  }
}