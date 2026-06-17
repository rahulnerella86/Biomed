// main.dart (placeholder)
import 'package:flutter/material.dart';

void main() {
  runApp(const EntEndoscopyApp());
}

class EntEndoscopyApp extends StatelessWidget {
  const EntEndoscopyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ent Endoscopy System',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: const Scaffold(
        body: Center(child: Text('Home (placeholder)')),
      ),
    );
  }
}

