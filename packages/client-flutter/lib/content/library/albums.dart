import 'package:flutter/material.dart';
import 'package:refracture_music/components/content/square_list.dart';

class ContentAlbums extends StatelessWidget {
  final double contentWidth;

  final Function openAlbum;

  const ContentAlbums({required this.contentWidth, required this.openAlbum}) : super();

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> albums = [{
      "id": "2678450293423487097324987",
      "art": "assets/icon/kaffee-placeholder.png",
      "title": "consectetur adipiscing",
      "type": 2,
      "year": 2023,
      "author": {
        "id": "2678450293423487097324987",
        "name": "OpenMoji",
      },
    }];

    for (var i = 0; i < 40; i++) {
      albums.add(albums[0]);
    }

    return SquareList(contentWidth: contentWidth, squareList: albums, open: openAlbum);
  }
}