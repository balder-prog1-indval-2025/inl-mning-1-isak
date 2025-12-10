export default class HP {
  constructor(x, y, size, alive_img, dead_img) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.alive_img = alive_img;
    this.dead_img = dead_img;
    this.spacing = -size * 0.05;
    this.hp = 10;
  }

  setHP(hp) {
    this.hp = hp;
  }

  draw() {
    for (let i = 0; i < 10; i++) {
      if (i < this.hp) {
        image(
          this.alive_img,
          this.x + i * (this.size + this.spacing),
          this.y,
          this.size,
          this.size
        );
      } else {
        image(
          this.dead_img,
          this.x + i * (this.size + this.spacing),
          this.y,
          this.size,
          this.size
        );
      }
    }
  }
}
