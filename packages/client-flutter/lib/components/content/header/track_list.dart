import 'package:flutter/material.dart';
import 'package:just_the_tooltip/just_the_tooltip.dart';
import 'package:refracture_music/components/utility/button.dart';

import '../../utility/icon.dart';

class TrackListHeader extends StatelessWidget {
  final String trackList;

  const TrackListHeader({required this.trackList}) : super();
  

  @override
  Widget build(BuildContext context) {

    final subtext = Theme.of(context).textTheme.bodySmall?.apply(color: const Color(0xFF649AA6));

    return Row(children: [
      const Image(image: ResizeImage(AssetImage("assets/icon/kaffee-placeholder.png"), width: 128), width: 100),
      const SizedBox(width: 12),
      Column(
        crossAxisAlignment: CrossAxisAlignment.baseline,
        textBaseline: TextBaseline.alphabetic,
        children: [
          const Row(children: [
            Text("consectetur adipiscing"),
            SizedBox(width: 10),
            JustTheTooltip(
              content: Padding(
                padding: EdgeInsets.all(8),
                child: Text('Saved on local device.'),
              ),
              child: CustomIcon(pointKey: 'context-local', size: 14),
            ),
          ]),
          const SizedBox(height: 12),
          Row(children: [
            CustomButton(icon: "player-play", onPressed: () {}, removePadding: true,),
            CustomButton(icon: "player-shuffle", onPressed: () {}),
            CustomButton(icon: "context-select-mood", onPressed: () {}),
            CustomButton(icon: "context-edit", onPressed: () {}),
            CustomButton(icon: "context-more", onPressed: () {}),
          ]),
        ]
      ),
      const Spacer(),
      Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        textBaseline: TextBaseline.alphabetic,
        children: [
          Row(children: [
            Text("24", style: subtext),
            const SizedBox(width: 4),
            const CustomIcon(pointKey: "context-music-notes", size: 12),
            const SizedBox(width: 20),
            Text("2 hrs", style: subtext),
            const SizedBox(width: 4),
            const CustomIcon(pointKey: "detail-duration", size: 12),
          ]),
          const SizedBox(height: 12),
          Align(
            alignment: Alignment.bottomRight,
            child: Row(children: [
              Text('Snowboarder1337', style: subtext),
              CustomButton(icon: "context-peer", onPressed: () {}),
            ]),
          ),
        ]
      ),
    ]);
  }
}