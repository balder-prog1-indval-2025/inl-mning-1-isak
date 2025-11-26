import Entity from "./Entity";

export default class Bullet extends Entity {
  constructor(x, y, dir, start_speed, sprite = null) {
    const w = 10;
    const h = 4;
    super(x, y, w, h, sprite);
    super.setColor(0, 0, 0);
    this.width = w;
    this.height = h;
    this.as = 0.4;
    this.dir = dir;
    this.speed = start_speed + this.as;
  }

  update(dT) {
    this.x += this.dir * this.speed * dT;
    this.hitbox.moveTo(this.x, this.y);
    //console.log(this.x);
  }

  outOfBounds() {
    return this.x < -this.width * 2 || this.x > width + this.width * 2;
  }
}
