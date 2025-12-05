import Entity from "./Entity";

export default class Zombie extends Entity {
  constructor(x, y, w, h, sprite = null, zombie_images) {
    super(x, y, w, h, sprite);
    this.x_movement_speed = random(0.09, 0.2);
    this.dir = round(random(0, 1)) * 2 - 1;
    this.dead = false;
    this.hp = round(random(1, 3));
    this.spawning = true;
    this.zombie_images = zombie_images;
  }
  update(dT, bullets, player) {
    if (this.spawning) {
      this.x_vel = this.dir * this.x_movement_speed * dT;
      this.x += this.x_vel;
      if (this.dir == 1 && this.x > 10) {
        this.spawning = false;
      } else if (this.dir == -1 && this.x < width - this.w - 10) {
        this.spawning = false;
      }
      return;
    }
    if (this.x > width - this.w) {
      this.dir = -this.dir;
      this.x = width - this.w;
    }
    if (this.x < 0) {
      this.dir = -this.dir;
      this.x = 0;
    }
    for (let bullet of bullets) {
      if (this.hitbox.intersectsWith(bullet.hitbox)) {
        this.hp--;
        bullet.dead = true;
      }
    }

    this.dead = this.hp <= 0;
    this.x_vel = lerp(this.x_vel, this.dir * this.x_movement_speed * dT, 0.1);

    this.x += this.x_vel;
    this.hitbox.moveTo(this.x, this.y);
  }

  draw() {
    const frameIndex = Math.floor(frameCount / 5) % this.zombie_images.length;
    image(
      this.zombie_images[frameIndex],
      this.x,
      this.y - 20,
      this.w * 1.5,
      this.h * 1.5
    );
  }
}
