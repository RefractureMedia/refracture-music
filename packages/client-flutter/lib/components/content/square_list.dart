import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:just_the_tooltip/just_the_tooltip.dart';
import 'package:refracture_music/util/main.dart';

enum SquareType { playlist, artist, album, single, EP}

class SquareList extends StatelessWidget {
  final double contentWidth;

  final List<Map<String, dynamic>> squareList;

  final Function open;

  const SquareList({required this.contentWidth, required this.squareList, required this.open}) : super();

  @override
  Widget build(BuildContext context) {
    double itemWidth = 100;
    double itemHeight = 198;

    double spaceY = 12;
    double spaceX = 12; // haha

    final title = Theme.of(context).textTheme.bodySmall?.apply(fontSizeDelta: - 1);

    final subtext = Theme.of(context).textTheme.bodySmall?.apply(color: const Color(0xFF649AA6), fontSizeDelta: - 3);

    return SingleChildScrollView(child: StaggeredGrid.count(
      crossAxisCount: (contentWidth / (itemWidth + spaceX)).floor(),
      mainAxisSpacing: spaceY,
      crossAxisSpacing: spaceX,
      children: [...squareList.map((square) {

        final type = SquareType.values[square['type']];

        String description = "${capitalize(type.name)} • ";

        if (type == SquareType.artist) {
          description += "${square['listeners']} listeners";
        } else {
          description += "${square['author']['name']} • ";

          if (type == SquareType.playlist) {

            description += "${square['track_count']} tracks";
          } else {
            description += "${square['year']}";
          }
        }

        return SizedBox(
          width: itemWidth,
          height: itemHeight,
          child: Column(children: [
            GestureDetector(
              onTap: () { open(square['id']); },

              child: Image(image: ResizeImage(AssetImage(square['art']), width: 128), width: 100),
            ),
            const SizedBox(height: 6),
            Text(
              square['title'],
              style: title,
              maxLines: 2, 
              overflow: TextOverflow.ellipsis
            ),
            JustTheTooltip(
              preferredDirection: AxisDirection.up,
              content: Padding(
                padding: EdgeInsets.all(8),
                child: Text(description),
              ),
              child: Text(
                description,
                style: subtext,
                maxLines: 2, 
                overflow: TextOverflow.ellipsis
              )
            ),
          ])
        );
      })],
    ));
  }
}