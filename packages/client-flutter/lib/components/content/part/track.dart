import 'package:flutter/material.dart';

import '../../../util/main.dart';

class Track extends StatelessWidget {
  final Map<String, dynamic> data;

  const Track({required this.data}) : super();

  @override
  Widget build(BuildContext context) {
    final subtext = Theme.of(context).textTheme.bodySmall?.apply(color: const Color(0xFF649AA6));

    return Column(children: [
      const SizedBox(height: 10),
      Row(children: [
        Image(image: ResizeImage(AssetImage(data['album']['art']), width: 80), width: 50),
        const SizedBox(width: 10),
        Text(data['title']),
        const Spacer(),
        Text(data['artists'].map((artist) {
          return artist['name'];
        }).join(', '), style: subtext),
        const Spacer(),
        Text(data['album']['title'], style: subtext),
        const Spacer(),
        Text(durationToTimestamp(data['duration']), style: subtext),
      ]),
      const SizedBox(height: 10),
    ]);
  }
}