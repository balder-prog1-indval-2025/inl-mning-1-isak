import Entity from "./Entity";

export default class Bullet extends Entity {
  constructor(x, y, dir, start_speed, sprite = null) {
    this.width = 10;
    this.height = 4;
    this.as = 2;
    this.dir = dir;
    this.speed = start_speed + this.as;
    super(x, y, this.width, this.height, sprite);
  }

  update(dT) {
    this.x += this.dir * this.speed * dT;
  }

  outOfBounds() {
    return x < -this.width * 2 || x > width + this.width * 2;
  }
}
