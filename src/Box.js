export default class HitBox {
  #xorg;
  #yorg;
  #x_off;
  #y_off;

  constructor(x_origin, y_origin, x_off, y_off, width, height) {
    this.#xorg = x_origin;
    this.#yorg = y_origin;
    this.#x_off = x_off;
    this.#y_off = y_off;
    this.x = this.#xorg + this.#x_off;
    this.y = this.#yorg + this.#y_off;
    this.w = width;
    this.h = height;

    this.debug_mode = false;
  }

  /**
   * Flyttar hitboxen
   * @param {*} x x-koordinat
   * @param {*} y y-koordinat
   */
  moveTo(x, y) {
    this.#xorg = x;
    this.#yorg = y;
    this.x = this.#xorg + this.#x_off;
    this.y = this.#yorg + this.#y_off;

    /*
    noFill();
    stroke(0);
    strokeWeight(1);
    rect(this.x, this.y, this.w, this.h);
    noStroke();
    */
  }

  /**
   * AABB kollisionsdetektion
   * @param {*} other_box
   * @returns true om kolliderar, false annars
   */
  intersectsWith(other_box) {
    return (
      this.x + this.w > other_box.x &&
      this.x < other_box.x + other_box.w &&
      this.y + this.h > other_box.y &&
      this.y < other_box.y + other_box.h
    );
  }

  /**
   * kollar om en punkt ligger innanfär hitboxen
   * @param {*} mouse_x
   * @param {*} mouse_y
   * @returns
   */
  pointIntersects(mouse_x, mouse_y) {
    return (
      mouse_x > this.x &&
      mouse_x < this.x + this.w &&
      mouse_y > this.y &&
      mouse_y < this.y + this.h
    );
  }
}
