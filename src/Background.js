export default class Background {
  constructor() {
    this.cloud;
  }

  cloud(x, y) {
    fill(255);

    circle(x, y, 120);
    circle(x + 75, y, 125);
    circle(x + 50, y - 50, 125);
    circle(x + 300, y - 15, 100);
    circle(x + 350, y - 15, 115);
    circle(x + 325, y - 50, 100);
  }

  draw() {
    background(100, 50, 200);
    this.cloud(200, 150);
  }
}
