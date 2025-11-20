import HitBox from "./Box";

export default class Player {
  constructor(x, y, w, h) {
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
