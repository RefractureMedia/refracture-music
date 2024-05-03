import 'package:flutter/material.dart';
import 'package:just_the_tooltip/just_the_tooltip.dart';
import 'package:refracture_music/components/utility/button.dart';
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

    navigate(NavPage page) {
      return CustomButton(icon: "navigation-${page.name}", onPressed: () => setState(() => currentPage = page), removePadding: true);
    }

    final subtext = Theme.of(context).textTheme.bodySmall?.apply(color: const Color(0xFF649AA6));

    return Container(
      decoration: const BoxDecoration(color: Color(0xFF212E31)),
      child: Container(
        decoration: const BoxDecoration(color: Color(0x19000000)),
        child: Column(
          children: [
            Expanded(child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Stack( // Sidebar
                  children: [
                    CustomPaint(
                      size: Size(90, (90*4.41333).toDouble()),
                      painter: SidebarBG(),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(22.0), 
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Image(image: ResizeImage(AssetImage('assets/icon/icon.png'), width: 64), width: 36), // Why is this like this
                          const SizedBox(height: 58), // fix this crap later
                          navigate(NavPage.home),
                          const SizedBox(height: 5), // lol
                          navigate(NavPage.search),
                          navigate(NavPage.library),
                          const SizedBox(height: 58), // fix this crap later
                          CustomButton(icon: 'context-peer', onPressed: () {}, size: 20, removePadding: true),
                          CustomButton(icon: 'navigation-settings', onPressed: () {}, size: 20, removePadding: true),
                        ],
                      )
                    ),
                  ],
                ),
                Padding(
                  padding: const EdgeInsets.all(12.0),
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
              child: Stack(children: [
                Row(children: [
                  const SizedBox(width: 7),
                  const Image(image: ResizeImage(AssetImage('assets/icon/kaffee-placeholder.png'), width: 85)),
                  const SizedBox(width: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      const SizedBox(height: 16),
                      const Text('KAFFEE'),
                      Row(children: [
                        Text('Openmoji', style: subtext),
                        const SizedBox(width: 6),
                        const JustTheTooltip(
                          preferredDirection: AxisDirection.up,
                          content: Padding(
                            padding: EdgeInsets.all(8),
                            child: Text('Saved on local device.'),
                          ),
                          child: CustomIcon(pointKey: 'context-local', size: 14),
                        ),
                      ]),
                    ],
                  ),
                ]),
                Column(
                  children: [
                    const SizedBox(height: 14),
                    Row( // Controls
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CustomButton(icon: 'player-previous', onPressed: () {}, size: 35),
                        Stack(children: [
                          CustomButton(icon: 'player-play', onPressed: () {}, size: 35),
                          // CustomButton(icon: 'player-pause', onPressed: () {}),
                        ]),
                        CustomButton(icon: 'player-skip', onPressed: () {}, size: 35),
                      ],
                    ),
                    const Spacer(),
                    Row(children: [
                      const SizedBox(width: 103),
                      Column(children: [
                        const SizedBox(height: 6),
                        SizedBox( // Seekbar
                          height: 6,
                          width: MediaQuery.of(context).size.width-240,
                          child: GestureDetector(
                            child: Stack(children: [
                              Container(
                                color: const Color(0xFF99ECFF),
                                child: Container(
                                  color: const Color(0x59000000),
                                ),
                              ),
                              Container(
                                color: const Color(0xFF99ECFF),
                                width: MediaQuery.of(context).size.width*.25
                              )
                            ]),
                          ),
                        ),
                      ]),
                      const SizedBox(
                        width: 135, 
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text('1:40'),
                            Text('/'),
                            Text('3:30'),
                          ],
                        ),
                      ),
                    ]),
                    
                    const SizedBox(height: 8),
                  ],
                ),
                Column(children: [
                  const SizedBox(height: 14),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Stack(children: [
                        CustomButton(icon: 'player-volume-full', onPressed: () {}, size: 34),
                        // CustomButton(icon: 'player-volume-partial', onPressed: () {}, size: 34),
                        // CustomButton(icon: 'player-volume-muted', onPressed: () {}, size: 34),
                      ]),
                      CustomButton(icon: 'player-shuffle', onPressed: () {}, size: 34),
                      CustomButton(icon: 'player-repeat', onPressed: () {}, size: 34),
                      CustomButton(icon: 'player-queue', onPressed: () {}, size: 34),
                    ]
                  ),
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
      path_0.moveTo(size.width,0);
      path_0.lineTo(size.width*0.6800000,size.height*0.8670695);
      path_0.lineTo(0,size.height);
      path_0.lineTo(0,0);
      path_0.lineTo(size.width,0);
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