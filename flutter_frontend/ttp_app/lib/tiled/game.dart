import 'package:flutter/services.dart';
import 'package:flutter/cupertino.dart';
import 'package:flame/game.dart';
import 'package:flame/input.dart';
import 'package:flame/components.dart';
import 'package:ttp_app/tiled/world/walls.dart';
import 'package:ttp_app/tiled/helpers/direction.dart';
import 'package:ttp_app/tiled/components/player.dart';
import 'package:flame_tiled/flame_tiled.dart';
import 'package:ttp_app/tiled/world/npc.dart';

class MainGame extends FlameGame
    with
        KeyboardEvents,
        PanDetector,
        ScaleDetector,
        TapDetector,
        HasCollisionDetection,
        HasGameRef {
  final Player _player = Player();
  final DefaultNPCSprites _sprite1 = DefaultNPCSprites();
  late TiledComponent mapComponent;

  static const double _minZoom = 3.0;
  final double _startZoom = _minZoom;

  @override
  Future<void> onLoad() async {
    await super.onLoad();
    camera.viewfinder
      ..zoom = _startZoom
      // ..anchor = const Anchor(-0.4, -0.4);
      ..anchor = Anchor.center;

    mapComponent = await TiledComponent.load(
      'office_map.tmx',
      Vector2.all(16.0),
    );
    mapComponent.debugMode = true;
    world.add(mapComponent..priority = 0);

    world.add(_player
      ..position = Vector2(176, 128)
      ..width = 16.0
      ..height = 32.0
      ..priority = 1
      ..anchor = Anchor.center);
    camera.follow(_player);
    world.add(_sprite1
      ..position = Vector2(117, 239)
      ..width = 16.0
      ..height = 32.0
      ..priority = 1
      ..anchor = Anchor.center);

    final objectGroup = mapComponent.tileMap.getLayer<ObjectGroup>('Walls');
    for (final object in objectGroup!.objects) {
      world.add(Walls(
          size: Vector2(object.width, object.height),
          position: Vector2(object.x, object.y)));
    }
    camera.follow(_player);
    game.overlays.add('InitialText');
    game.overlays.remove('Joystick');
  }

  void onJoyPadDirectionChanged(Direction direction) {
    _player.direction = direction;
  }
}
