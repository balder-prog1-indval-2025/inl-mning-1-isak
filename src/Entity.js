import HitBox from "./Box";

export default class Entity {
  constructor(x, y, w, h, sprite = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = 100;
    this.g = 100;
    this.b = 100;

    this.gravid = 0.03;
    this.y_vel = 0;
    this.x_vel = 0;

    this.x_movement_speed = 0.3;

    this.hitbox = new HitBox(x, y, 0, 0, w, h);

    this.textured = false;
    if (sprite != null) {
      this.sprite = sprite;
      this.textured = true;
    }

    this.grounded = false;
    this.ground_y = 0;
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
