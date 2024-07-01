import 'package:flutter/services.dart';
import 'package:flutter/cupertino.dart';
import 'package:flame/game.dart';
import 'package:flame/input.dart';
import 'package:flame/components.dart';
import 'helpers/direction.dart';
import 'components/player.dart';
import 'package:flame_tiled/flame_tiled.dart';
import 'package:tiled/tiled.dart';

class MainGame extends FlameGame
    with KeyboardEvents, PanDetector, ScaleDetector, TapDetector {
  final Player _player = Player();
  late TiledComponent mapComponent;

  static const double _minZoom = 0.8;
  static const double _maxZoom = 2.0;
  double _startZoom = _minZoom;

  @override
  Future<void> onLoad() async {
    camera.viewfinder
      ..zoom = _startZoom
      // ..anchor = const Anchor(-0.4, -0.4);
      ..anchor = Anchor.center;

    mapComponent = await TiledComponent.load(
      'office_map.tmx',
      Vector2.all(64.0),
    );
    mapComponent.debugMode = true;
    world.add(mapComponent..priority = 0);

    world.add(_player
      ..position = size / 2
      ..width = 64.0
      ..height = 128.0
      ..priority = 1
      ..anchor = Anchor.center);
    camera.follow(_player);
    await super.onLoad();
  }

  void onJoyPadDirectionChanged(Direction direction) {
    _player.direction = direction;
  }
}
