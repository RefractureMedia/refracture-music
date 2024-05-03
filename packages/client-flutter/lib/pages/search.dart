import 'package:flutter/material.dart';

class SearchPage extends StatefulWidget {
  const SearchPage() : super();

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  String? searchTerms;

  @override
  Widget build(BuildContext context) {
    return const Text("No results for no terms :D");
  }
}