import Entity from "./Entity";

export default class Player extends Entity {
  constructor(x, y, w, h, sprite = null) {
    super(x, y, w, h, sprite);
  }

  update(dT, ground) {
    this.y_vel += this.gravid;

    if (keyIsDown(65)) {
      this.x_vel = -this.x_movement_speed;
    }
    if (keyIsDown(68)) {
      this.x_vel = this.x_movement_speed;
    }
    if (!(keyIsDown(65) || keyIsDown(68))) {
      this.x_vel = 0;
    }

    this.x += this.x_vel * dT;

    if (this.hitbox.intersectsWith(ground.hitbox)) {
      this.y_vel = 0;
      this.y = ground.y - this.h;
    } else {
      this.y += this.y_vel * dT;
    }

    this.hitbox.moveTo(this.x, this.y);
  }
}
