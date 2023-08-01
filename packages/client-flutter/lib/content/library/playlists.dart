import 'package:flutter/material.dart';
import 'package:refracture_music/components/content/square_list.dart';

class ContentPlaylists extends StatelessWidget {
  final double contentWidth;

  final Function openPlaylist;

  const ContentPlaylists({required this.contentWidth, required this.openPlaylist}) : super();

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> playlists = [{
      "id": "2678450293423487097324987",
      "art": "assets/icon/kaffee-placeholder.png",
      "title": "consectetur adipiscing",
      "type": 0,
      "track_count": 5,
      "author": {
        "id": "2678450293423487097324987",
        "name": "OpenMoji",
      },
    }];

    for (var i = 0; i < 40; i++) {
      playlists.add(playlists[0]);
    }

    return SquareList(contentWidth: contentWidth, squareList: playlists, open: openPlaylist);
  }
}