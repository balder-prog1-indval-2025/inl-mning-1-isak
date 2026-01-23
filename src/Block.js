import HitBox from "./Box";

export default class Block {
  constructor(x, y, w, h, r = 255, g = 0, b = 0) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.g = g;
    this.b = b;
    this.hitbox = new HitBox(x, y, 0, 0, w, h);
  }

  setColor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  draw() {
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.w, this.h);
  }
}
