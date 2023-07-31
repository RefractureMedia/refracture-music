import 'package:flutter/material.dart';

import 'icon.dart';


class CustomButton extends StatefulWidget {

  final String icon;

  final void Function() onPressed;

  final double? size;
  final bool removePadding;

  const CustomButton({required this.icon, required this.onPressed, this.size, this.removePadding = false}) : super();

  @override
  State<CustomButton> createState() => _NavButtonState();
}
class _NavButtonState extends State<CustomButton> {
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
        overlayColor: MaterialStateProperty.all(Colors.transparent),
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        minimumSize: widget.removePadding ? MaterialStateProperty.all(Size(1, 1)) : null,
      ),
      child: CustomIcon(pointKey: widget.icon, active: active, size: widget.size ?? 24,)
    );
  }
}