import Entity from "./Entity";

// klass för pistolkulorna
export default class Bullet extends Entity {
  #speed_constant;
  #speed;
  #dead;

  constructor(x, y, dir, start_speed, sprite = null) {
    const w = 10;
    const h = 4;
    super(x, y, w, h, sprite);
    super.setColor(0, 0, 0);
    this.width = w;
    this.height = h;
    this.#speed_constant = 0.4;
    this.dir = dir;
    this.#speed = start_speed + this.#speed_constant;
    this.#dead = false;
  }

  update(dT) {
    // förflytta kulan i sin riktining
    this.x += this.dir * this.#speed * dT;
    this.hitbox.moveTo(this.x, this.y);
    //console.log(this.x);
  }

  outOfBounds() {
    // kollar om kulan är utanför skärmen eller död
    return (
      this.x < -this.width * 2 || this.x > width + this.width * 2 || this.#dead
    );
  }
}
