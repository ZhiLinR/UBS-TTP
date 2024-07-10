import 'package:flame/collisions.dart';
import 'package:flame/components.dart';
import 'package:ttp_app/tiled/helpers/direction.dart';
import 'package:flame/sprite.dart';
import 'package:ttp_app/tiled/world/walls.dart';
import 'package:flame/layout.dart';
import 'package:ttp_app/tiled/world/npc.dart';

class Player extends SpriteAnimationComponent
    with CollisionCallbacks, HasGameRef {
  final double _playerSpeed = 100.0;
  final double _animationSpeed = 0.15;

  late final SpriteAnimation _runDownAnimation;
  late final SpriteAnimation _runLeftAnimation;
  late final SpriteAnimation _runUpAnimation;
  late final SpriteAnimation _runRightAnimation;
  late final SpriteAnimation _standingAnimation;

  Direction direction = Direction.none;

  Player() : super() {
    debugMode = true;
  }

  @override
  Future<void> onLoad() async {
    super.onLoad();
    add(RectangleHitbox(
        anchor: Anchor.topLeft,
        isSolid: true,
        size: Vector2(16.0, 32.0),
        collisionType: CollisionType.active));
    await _loadAnimations().then((_) => {animation = _standingAnimation});
  }

  @override
  void onCollision(Set<Vector2> intersectionPoints, PositionComponent other) {
    if (other is Walls) {
      position = Vector2(
          intersectionPoints.last.x + 10.0, intersectionPoints.last.y + 10.0);
    } else if (other is DefaultNPCSprites) {
      position = Vector2(
          intersectionPoints.last.x + 10.0, intersectionPoints.last.y + 10.0);
      game.overlays.add('MenuOptions');
    }
  }

  @override
  void update(double dt) {
    super.update(dt);
    movePlayer(dt);
  }

  void move(Vector2 delta) {
    position.add(delta);
  }

  void movePlayer(double delta) {
    switch (direction) {
      case Direction.up:
        animation = _runUpAnimation;
        moveUp(delta);
        break;
      case Direction.down:
        animation = _runDownAnimation;
        moveDown(delta);
        break;
      case Direction.left:
        animation = _runLeftAnimation;
        moveLeft(delta);
        break;
      case Direction.right:
        animation = _runRightAnimation;
        moveRight(delta);
        break;
      case Direction.none:
        animation = _standingAnimation;
        break;
    }
  }

  Future<void> _loadAnimations() async {
    final spriteSheet = SpriteSheet(
      image: await gameRef.images.load('player.png'),
      srcSize: Vector2(16.0, 32.0),
    );

    _runDownAnimation = spriteSheet.createAnimation(
        row: 2, stepTime: _animationSpeed, from: 19, to: 24);

    _runLeftAnimation = spriteSheet.createAnimation(
        row: 2, stepTime: _animationSpeed, from: 13, to: 18);

    _runUpAnimation = spriteSheet.createAnimation(
        row: 2, stepTime: _animationSpeed, from: 7, to: 12);

    _runRightAnimation = spriteSheet.createAnimation(
        row: 2, stepTime: _animationSpeed, from: 1, to: 6);

    _standingAnimation = spriteSheet.createAnimation(
        row: 1, stepTime: _animationSpeed, from: 18, to: 24);
  }

  void moveUp(double delta) {
    position.add(Vector2(0, delta * -_playerSpeed));
  }

  void moveDown(double delta) {
    position.add(Vector2(0, delta * _playerSpeed));
  }

  void moveLeft(double delta) {
    position.add(Vector2(delta * -_playerSpeed, 0));
  }

  void moveRight(double delta) {
    position.add(Vector2(delta * _playerSpeed, 0));
  }
}
