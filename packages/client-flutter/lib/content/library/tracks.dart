import 'package:flutter/material.dart';
import 'package:refracture_music/components/content/track_list.dart';

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

    return TrackList(tracks: tracks);
  }
}