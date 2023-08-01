import 'package:flutter/material.dart';
import 'package:collection/collection.dart';

import '../../../util/main.dart';

class TrackList extends StatelessWidget {
  final List<Map<String, dynamic>> tracks;

  final Widget? header;

  final bool numbered;

  const TrackList({required this.tracks, this.header, this.numbered = false}) : super();
  

  @override
  Widget build(BuildContext context) {

    final List<Widget> list = [...tracks.mapIndexed((index, data) {
      return Column(children: [
        Track(data: data, number: numbered ? (index + 1) : null),
        Container(
          color: Color(0xFF3D5E66),
          height: index == (tracks.length - 1) ? 0 : 1,
        ),
      ]);
    })];

    if (header != null) {
      list.insert(0, header as Widget);
      list.insert(1, const SizedBox(height: 20));
    }

    return SingleChildScrollView(child: Column(children: list));
  }
}

class Track extends StatelessWidget {
  final Map<String, dynamic> data;

  final int? number;

  const Track({required this.data, this.number}) : super();

  @override
  Widget build(BuildContext context) {
    final subtext = Theme.of(context).textTheme.bodySmall?.apply(color: const Color(0xFF649AA6));

    return Column(children: [
      const SizedBox(height: 10),
      Row(children: [
        (number == null) ? 
          Image(image: ResizeImage(AssetImage(data['album']['art']), width: 80), width: 50)
          : Text("$number"),
        const SizedBox(width: 10),
        Text(data['title']),
        const Spacer(),
        Text(data['artists'].map((artist) {
          return artist['name'];
        }).join(', '), style: subtext),
        if (number == null) const Spacer(),
        if (number == null) Text(data['album']['title'], style: subtext),
        const Spacer(),
        Text(durationToTimestamp(data['duration']), style: subtext),
      ]),
      const SizedBox(height: 10),
    ]);
  }
}