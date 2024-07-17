import 'dart:async';
import 'package:flame/collisions.dart';
import 'package:flame/components.dart';

class Walls extends PositionComponent with CollisionCallbacks {
  Walls({required size, required position})
      : super(size: size, position: position) {
    debugMode = true;
  }

  @override
  FutureOr<void> onLoad() async {
    // TODO: implement onLoad
    await super.onLoad();
    add(RectangleHitbox(isSolid: true, collisionType: CollisionType.passive));
  }
}
