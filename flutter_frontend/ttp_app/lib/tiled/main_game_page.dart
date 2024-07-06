import 'package:flutter/material.dart';
import 'package:flame/game.dart';
import 'helpers/joypad.dart';

import 'game.dart';
import 'package:ttp_app/http/scenario.dart';

class MainGamePage extends StatefulWidget {
  final String uid;
  final String? topic;
  const MainGamePage({super.key, required this.uid, this.topic});

  @override
  MainGameState createState() => MainGameState();
}

class MainGameState extends State<MainGamePage> {
  MainGame game = MainGame();
  late Future<Map<String, dynamic>> futureScenario;
  @override
  void initState() {
    super.initState();
    futureScenario = generateScenario(widget.uid, widget.topic);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color.fromARGB(255, 255, 255, 255),
        body: Stack(
          children: [
            GameWidget(game: game),
            Align(
              alignment: Alignment.bottomRight,
              child: Padding(
                padding: const EdgeInsets.all(32.0),
                child:
                    Joypad(onDirectionChanged: game.onJoyPadDirectionChanged),
              ),
            )
          ],
        ));
  }
}
