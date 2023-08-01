import 'package:flutter/material.dart';
import 'package:refracture_music/components/content/track_list.dart';

import '../../components/content/header/track_list.dart';

class ContentPlaylist extends StatelessWidget {
  final String playlist;

  const ContentPlaylist({required this.playlist}) : super();
  

  @override
  Widget build(BuildContext context) {

    final List<Map<String, dynamic>> tracks = [{
      "id": "2678450293423487097324987",
      "title": "KAFFEE",
      "artists": [{
        "id": "2678450293423487097324987",
        "name": "OpenMoji",
      }],
      "duration": 210,
      "album": {
        "id": "2678450293423487097324987",
        "art": "assets/icon/kaffee-placeholder.png",
        "title": "consectetur adipiscing",
      },
    }];

    for (var i = 0; i < 20; i++) {
      tracks.add(tracks[0]);
    }

    return TrackList(tracks: tracks, header: TrackListHeader(trackList: ""));
  }
}