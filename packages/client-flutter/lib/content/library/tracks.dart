import 'package:flutter/material.dart';
import 'package:collection/collection.dart';
import 'package:refracture_music/components/content/part/track.dart';

class ContentTracks extends StatelessWidget {
  const ContentTracks() : super();
  

  @override
  Widget build(BuildContext context) {

    final List<Map<String, dynamic>> tracks = [{
      "id": "2678450293423487097324987",
      "album": {
        "id": "2678450293423487097324987",
        "art": "assets/icon/kaffee-placeholder.png",
        "title": "consectetur adipiscing",
      },
      "title": "KAFFEE",
      "artists": [{
        "id": "2678450293423487097324987",
        "name": "OpenMoji"
      }],
      "duration": 210
    }];

    for (var i = 0; i < 20; i++) {
      tracks.add(tracks[0]);
    }

    return Column(children: [...tracks.mapIndexed((index, data) {
      return Column(children: [
        Track(data: data),
        Container(
          color: Color(0xFF3D5E66),
          height: index == (tracks.length - 1) ? 0 : 1,
        ),
      ]);
    })]);
  }
}