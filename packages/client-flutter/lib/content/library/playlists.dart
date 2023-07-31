import 'package:flutter/material.dart';

class ContentPlaylists extends StatelessWidget {
  const ContentPlaylists() : super();

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> playlists = [{
      "id": "2678450293423487097324987",
      "art": "assets/icon/kaffee-placeholder.png",
      "title": "consectetur adipiscing",
      "track_count": "5",
      "artist": {
        "id": "2678450293423487097324987",
        "name": "OpenMoji",
      },
    }];
    for (var i = 0; i < 20; i++) {
      playlists.add(playlists[0]);
    }

    return GridView.count(
      crossAxisCount: 5,
      children: [...playlists.map((playlist) {
        return Container(child: Image(image: ResizeImage(AssetImage(playlist['art']), width: 85)));
      })]
    );
  }
}