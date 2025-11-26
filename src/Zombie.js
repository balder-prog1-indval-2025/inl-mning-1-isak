import Entity from "./Entity";

export default class Zombie extends Entity {
  constructor(x, y, w, h, sprite = null) {
    super(x, y, w, h, sprite);
    this.x_movement_speed = 0.1;
    this.dir = round(random(0, 1)) * 2 - 1;
    this.dead = false;
  }
  update(dT, bullets) {
    this.x_vel = this.dir * this.x_movement_speed * dT;
    if (this.x > width - this.w) {
      this.dir = -this.dir;
      this.x = width - this.w;
    }
    if (this.x < 0) {
      this.dir = -this.dir;
      this.x = 0;
    }
    for (let bullet of bullets) {
      if (this.hitbox.intersectsWith(bullet.hitbox)) {
        this.dead = true;
      }
    }

    this.x += this.x_vel;
  }
}
