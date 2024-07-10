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
  MainGame mainGame = MainGame();
  late final Scenario futureScenario;
  String? _option;

  @override
  void initState() {
    super.initState();
    setScenario();
  }

  void setScenario() async {
    futureScenario = await generateScenario(widget.uid, widget.topic);
    _option = futureScenario.options.active;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color.fromARGB(255, 255, 255, 255),
        body: Stack(
          children: [
            GameWidget(game: mainGame, overlayBuilderMap: {
              'MenuOptions': (context, Game game) {
                return AlertDialog(
                  insetPadding: EdgeInsets.fromLTRB(5, 50, 5, 20),
                  scrollable: true,
                  title: const Text('Kyle'),
                  content: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text('Hey Sam, what would you do if: '),
                        Container(
                          width: 400.0,
                          height: 200.0,
                          child: TypeWriter.text(
                            futureScenario.scenario,
                            duration: const Duration(milliseconds: 20),
                          ),
                        ),
                        Text('Do you have any advice?'),
                        SizedBox(
                          width: 400.0,
                          height: 200.0,
                          child: ListView(
                            children: [
                              ListTile(
                                subtitle: Text(futureScenario.options.active),
                                leading: Radio<String>(
                                  value: futureScenario.options.active,
                                  groupValue: _option,
                                  onChanged: (String? value) {
                                    setState(() {
                                      _option = value;
                                    });
                                  },
                                ),
                              ),
                              ListTile(
                                subtitle: Text(futureScenario.options.passive),
                                leading: Radio<String>(
                                  value: futureScenario.options.passive,
                                  groupValue: _option,
                                  onChanged: (String? value) {
                                    setState(() {
                                      _option = value;
                                    });
                                  },
                                ),
                              ),
                              ListTile(
                                subtitle:
                                    Text(futureScenario.options.proactive),
                                leading: Radio<String>(
                                  value: futureScenario.options.proactive,
                                  groupValue: _option,
                                  onChanged: (String? value) {
                                    setState(() {
                                      _option = value;
                                    });
                                  },
                                ),
                              ),
                              ListTile(
                                subtitle: Text(futureScenario.options.reactive),
                                leading: Radio<String>(
                                  value: futureScenario.options.reactive,
                                  groupValue: _option,
                                  onChanged: (String? value) {
                                    setState(() {
                                      _option = value;
                                    });
                                  },
                                ),
                              ),
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                  actions: <Widget>[
                    TextButton(
                      child: const Text('Advice Kyle'),
                      onPressed: () {
                        game.overlays.remove('MenuOptions');
                        game.overlays.add("Joystick");
                      },
                    ),
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
                            game.overlays.remove('InitialText');
                            game.overlays.add("Joystick");
                          },
                        ),
                      ],
                    )
                  ],
                );
              },
              'Joystick': (context, Game game) {
                return Align(
                  alignment: Alignment.bottomRight,
                  child: Padding(
                    padding: const EdgeInsets.all(32.0),
                    child: Joypad(
                        onDirectionChanged: mainGame.onJoyPadDirectionChanged),
                  ),
                );
              },
              'SuccessText': (context, Game game) {
                return Column(
                  children: [
                    AlertDialog(
                      title: const Text('New Email!'),
                      content: const SingleChildScrollView(
                        child: ListBody(
                          children: <Widget>[
                            Text(
                                "Hi Sam, \n\nThanks for the advice, I'll do my best!\n\nRegards, \nKyle"),
                          ],
                        ),
                      ),
                      actions: <Widget>[
                        TextButton(
                          child: const Text('Close'),
                          onPressed: () {
                            game.overlays.remove('InitialText');
                            game.overlays.add("Joystick");
                          },
                        ),
                      ],
                    )
                  ],
                );
              },
            }),
          ],
        ));
  }
}
