import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:refracture_music/pages/home.dart';
import 'package:refracture_music/pages/search.dart';
import 'package:refracture_music/pages/library.dart';
import 'package:refracture_music/components/utility/icon.dart';

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
      child: Container(
        decoration: const BoxDecoration(color: Color(0x19000000)),
        child: Column(
          children: [
            Expanded(child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Stack( // Sidebar
                  children: [
                    CustomPaint(
                      size: Size(90, (90*3.83).toDouble()),
                      painter: SidebarBG(),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(10.0), 
                      child: Column(children: [
                        const Image(image: ResizeImage(AssetImage('assets/icon/icon.png'), width: 128), width: 60), // Why is this like this
                        const SizedBox(height: 20), // yes
                        Column(
                          children: [
                            NavButton(page: NavPage.home, onPressed: () => setState(() => currentPage = NavPage.home)),
                            NavButton(page: NavPage.search, onPressed: () => setState(() => currentPage = NavPage.search)),
                            NavButton(page: NavPage.library, onPressed: () => setState(() => currentPage = NavPage.library)),
                          ],
                        ),
                        const SizedBox(height: 80), // fix this crap later
                        const Text('Avatar'),
                        const Text('Settings'),
                      ],
                    )),
                  ],
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: Stack(children: [
                    if (currentPage == NavPage.home) const HomePage(),
                    if (currentPage == NavPage.search) const SearchPage(),
                    if (currentPage == NavPage.library) const LibraryPage(startPage: LibPage.tracks),
                  ]),
                )
              ]
            )),

            Container(
              height: 100,
              width: MediaQuery.of(context).size.width,
              color: const Color(0xFF212E31),
              child: const Stack(children: [
                Row(children: [
                  Text('Art'),
                  Column(children: [
                    Text('Title'),
                    Text('Artist'),
                  ]),
                ]),
                Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text('Previous'),
                        Text('Play'),
                        Text('Skip'),
                      ],
                    ),
                    Text('Seekbar'),
                  ],
                ),
                Column(children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text('Volume'),
                      Text('Shuffle'),
                      Text('Repeat'),
                      Text('Queue'),
                    ]
                  ),
                  Spacer(),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text('Current'),
                      Text('/'),
                      Text('Duration'),
                    ]
                  )
                ])
              ])
            ),
          ],
        )
      )
    );
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
      paint_0_fill.color = const Color(0xff212E31).withOpacity(1.0);

    canvas.drawPath(path_0,paint_0_fill);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}

class NavButton extends StatefulWidget {

  final NavPage page;

  final void Function() onPressed;

  const NavButton({required this.page, required this.onPressed}) : super();

  @override
  State<NavButton> createState() => _NavButtonState();
}
class _NavButtonState extends State<NavButton> {
  bool active = false;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: widget.onPressed,
      onHover: (value) => setState(() => active = value),
      style: ButtonStyle(
        backgroundColor: MaterialStateProperty.all(Colors.transparent),
        padding: MaterialStateProperty.all(EdgeInsets.zero),
        elevation: MaterialStateProperty.all(0),
        overlayColor: MaterialStateProperty.all(Colors.transparent)
      ),
      child: CustomIcon(pointKey: 'navigation-${widget.page.name}', active: active)
    );
  }
}