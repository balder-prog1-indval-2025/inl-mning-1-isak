export default class NumberDisplay {
  constructor(x, y, size = 30, color = "white", img) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.img = img;
    this.value = 0;
  }

  setValue(value) {
    this.value = value;
    this.draw();
  }

  add(amount = 1) {
    this.value += amount;
    this.draw();
  }

  subtract(amount = 1) {
    this.value -= amount;
    this.draw();
  }

  draw() {
    image(this.img, this.x, this.y, this.size, this.size);
    fill(this.color);
    textSize(this.size * 0.7);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    textFont(`Courier`);
    text(this.value, this.x + this.size + 8, this.y + this.size / 2 + 2);
  }
}
