import HitBox from "./Box";

// föräldraklass till zombie och player. Innehåller grundläggande rörelse, färg och ritfunktioner
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

    this.x_movement_speed = 0.4;

    this.hitbox = new HitBox(x, y, 0, 0, w, h);

    this.textured = false;
    if (sprite != null) {
      this.sprite = sprite;
      this.textured = true;
    }

    this.grounded = false;
    this.ground_y = 0;
    this.dir = 1;
  }

  setColor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  draw() {
    noStroke();
    fill(this.r, this.g, this.b);
    rect(this.x, this.y, this.w, this.h - 1);
  }
}
