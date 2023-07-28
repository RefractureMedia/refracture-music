import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:refracture_music/pages/home.dart';
import 'package:refracture_music/pages/search.dart';
import 'package:refracture_music/pages/library.dart';

enum NavPage { home, library, search }

class NavigationView extends StatefulWidget {
  const NavigationView({required this.startPage}) : super();

  final NavPage startPage;

  @override
  State<NavigationView> createState() => _NavigationViewState();
}

class _NavigationViewState extends State<NavigationView> {
  NavPage? currentPage;

  @override
  Widget build(BuildContext context) {
    currentPage ??= widget.startPage;

    return Container(
      decoration: const BoxDecoration(color: Color(0xFF212E31)),

      child: Expanded(child: Container(
        decoration: const BoxDecoration(color: Color(0x19000000)),
        child: Stack(
          children: [
            Stack(
              children: [
                CustomPaint(
                  size: Size(90, (90*3.83).toDouble()),
                  painter: SidebarBG(),
                ),
                const Positioned(
                  left: 10,
                  child: Image(image: ResizeImage(AssetImage('assets/icon/icon.png'), width: 128), width: 60),
                ) // Why is this like this
              ],
            ),

            Positioned(
              left: 90,
              child: Stack(children: [
                if (currentPage == NavPage.home) const HomePage(),
                if (currentPage == NavPage.search) const SearchPage(),
                if (currentPage == NavPage.library) const LibraryPage(startPage: LibPage.tracks),
              ])
            ),

            Positioned.fill(child: Align(
              alignment: AlignmentDirectional.bottomStart,
              child: Container(
                width: MediaQuery.of(context).size.width,
                height: 100,
                color: Color(0xFF212E31),
              )
            )),
          ],
        ),
      ),
    ));
  }
}

//Copy this CustomPainter code to the Bottom of the File
class SidebarBG extends CustomPainter {

  @override
  void paint(Canvas canvas, Size size) {
    Path path_0 = Path();
      path_0.moveTo(size.width*0.6800000,size.height);
      path_0.lineTo(0,size.height);
      path_0.lineTo(0,0);
      path_0.lineTo(size.width,0);
      path_0.lineTo(size.width*0.6800000,size.height);
      path_0.close();

    Paint paint_0_fill = Paint()..style=PaintingStyle.fill;
      paint_0_fill.color = Color(0xff212E31).withOpacity(1.0);

    canvas.drawPath(path_0,paint_0_fill);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}