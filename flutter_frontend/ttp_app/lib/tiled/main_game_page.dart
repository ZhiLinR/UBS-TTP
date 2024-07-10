import 'package:flutter/material.dart';
import 'package:flame/game.dart';
import 'helpers/joypad.dart';

import 'game.dart';
import 'package:ttp_app/http/scenario.dart';
import 'package:ttp_app/widgets/alertdialog.dart';
import 'package:typewritertext/typewritertext.dart';

class MainGamePage extends StatefulWidget {
  final String uid;
  final String? topic;
  const MainGamePage({super.key, required this.uid, this.topic});

  @override
  MainGameState createState() => MainGameState();
}

class MainGameState extends State<MainGamePage> {
  MainGame game = MainGame();
  late final Scenario futureScenario;
  @override
  void initState() {
    super.initState();
    setScenario();
  }

  void setScenario() async {
    futureScenario = await generateScenario(widget.uid, widget.topic);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color.fromARGB(255, 255, 255, 255),
        body: Stack(
          children: [
            GameWidget(game: game, overlayBuilderMap: {
              'MenuOptions': (context, Game game) {
                return Column(
                  children: [
                    AlertDialog(
                      title: const Text('Kyle'),
                      content: SingleChildScrollView(
                        child: ListBody(
                          children: <Widget>[
                            Text('Hey Sam,\n'),
                            SizedBox(
                              width: 200,
                              height: 300,
                              child: TypeWriter.text(
                                futureScenario.scenario,
                                duration: const Duration(milliseconds: 30),
                              ),
                            ),
                            Text('Do you have any advice?'),
                          ],
                        ),
                      ),
                      actions: <Widget>[
                        TextButton(
                          child: const Text('Advice Kyle'),
                          onPressed: () {
                            const menuOptionsIdentifier = 'PauseMenu';
                            game.overlays.remove(menuOptionsIdentifier);
                          },
                        ),
                      ],
                    )
                  ],
                );
              },
              'InitialText': (context, Game game) {
                return Column(
                  children: [
                    AlertDialog(
                      title: const Text('New Email!'),
                      content: const SingleChildScrollView(
                        child: ListBody(
                          children: <Widget>[
                            Text(
                                "Hi Sam, \n\nCould we meet in the office today?\n\nRegards, \nKyle"),
                          ],
                        ),
                      ),
                      actions: <Widget>[
                        TextButton(
                          child: const Text('Find Kyle!'),
                          onPressed: () {
                            const initialContext = 'InitialText';
                            game.overlays.remove(initialContext);
                          },
                        ),
                      ],
                    )
                  ],
                );
              }
            }),
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
