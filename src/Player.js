import HitBox from "./Box";
import Entity from "./Entity";

export default class Player extends Entity {
  constructor(x, y, w, h) {
    super(x, y, w, h);
  }

  update(dT, ground) {
    this.y_vel += this.gravid;

    if (this.hitbox.intersectsWith(ground.hitbox)) {
      this.y_vel = 0;
      this.y = ground.y - this.h;
    }

    this.y += this.y_vel * dT;
    this.hitbox.moveTo(this.x, this.y);
  }
}
