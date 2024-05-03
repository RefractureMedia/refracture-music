import 'package:flutter/material.dart';
import 'package:refracture_music/components/content/square_list.dart';

class ContentArtists extends StatelessWidget {
  final double contentWidth;

  final Function openArtist;

  const ContentArtists({required this.contentWidth, required this.openArtist}) : super();

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> artists = [{
      "id": "2678450293423487097324987",
      "art": "assets/icon/kaffee-placeholder.png",
      "title": "OpenMoji",
      "type": 1,
      "listeners": "37K",
    }];

    for (var i = 0; i < 40; i++) {
      artists.add(artists[0]);
    }

    return SquareList(contentWidth: contentWidth, squareList: artists, open: openArtist);
  }
}