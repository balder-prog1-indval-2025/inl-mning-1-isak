import HitBox from "./Box";

export default class Player {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hitbox = new HitBox(x, y, 0, 0, w, h);
  }
  draw() {
    rect(this.x, this.y, this.w, this.h);
  }
}
