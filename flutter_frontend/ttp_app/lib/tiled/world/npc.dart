import 'package:flame/components.dart';
import 'package:flame/effects.dart';
import 'package:flame/game.dart';
import 'package:flame/layout.dart';
import 'package:flame/sprite.dart';
import 'package:flame/collisions.dart';
import 'package:ttp_app/tiled/components/player.dart';

class DefaultNPCSprites extends SpriteAnimationComponent
    with CollisionCallbacks, HasGameRef {
  late final SpriteAnimation _defaultAnimation;
  DefaultNPCSprites() : super() {
    debugMode = true;
  }
  @override
  Future<void> onLoad() async {
    super.onLoad();

    add(RectangleHitbox(
        anchor: Anchor.topLeft,
        isSolid: true,
        size: Vector2(16.0, 32.0),
        collisionType: CollisionType.passive));
    await _loadAnimations().then((_) => {animation = _defaultAnimation});
  }

  Future<void> _loadAnimations() async {
    final spriteSheet = SpriteSheet(
      image: await gameRef.images.load('npcs/Premade_Character_05.png'),
      srcSize: Vector2(16.0, 32.0),
    );
    _defaultAnimation =
        spriteSheet.createAnimation(row: 1, stepTime: 0.3, from: 18, to: 24);
  }
}
