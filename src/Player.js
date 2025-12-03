import Entity from "./Entity";

export default class Player extends Entity {
  constructor(x, y, w, h, sprite = null) {
    super(x, y, w, h, sprite);
    this.jump_power = 0.67;
    this.target_x_vel = 0;
    this.hp = 10;
    this.game_over = false;
    this.hit = false;
  }

  update(dT, ground, zombies) {
    this.y_vel += this.gravid;

    if (keyIsDown(65)) {
      this.target_x_vel = -this.x_movement_speed;
      if (this.x_vel > 0) this.dir = 1;
      if (this.x_vel < 0) this.dir = -1;
    }
    if (keyIsDown(68)) {
      this.target_x_vel = this.x_movement_speed;
      if (this.x_vel > 0) this.dir = 1;
      if (this.x_vel < 0) this.dir = -1;
    }
    if (!(keyIsDown(65) || keyIsDown(68))) {
      this.target_x_vel = 0;
    }

    this.x_vel = lerp(this.x_vel, this.target_x_vel, 0.1);
    if (this.x < 0) {
      this.x_vel = 0;
      this.x = 0;
    }
    if (this.x > width - this.w) {
      this.x_vel = 0;
      this.x = width - this.w;
    }
    this.x += this.x_vel * dT;

    //console.log(this.grounded);

    if (this.hitbox.intersectsWith(ground.hitbox)) {
      //console.log("t");
      this.y_vel = 0;
      this.ground_y = ground.y - this.h - 2;
      this.y = ground.y - this.h + 1;
      this.grounded = true;
    } else {
      this.y += this.y_vel * dT;
      //console.log("n");
      this.grounded = false;
    }
    if (keyIsDown(32) && this.grounded) {
      this.y_vel = -this.jump_power;
      this.y = this.ground_y;
      this.grounded = false;
      //console.log("skutt");
    }
    this.hit = false;
    for (let zombie of zombies) {
      if (zombie.hitbox.intersectsWith(this.hitbox)) {
        console.log(this.hp);
        if (this.x < zombie.x) {
          this.x = zombie.x - this.w;
          zombie.x = this.hitbox.x + this.w + 8;
        }

        if (this.x > zombie.x) {
          this.x = zombie.x + zombie.w;
          zombie.x = this.hitbox.x - zombie.w - 8;
        }

        this.hit = true;
        zombie.dir = -zombie.dir;
        //console.log(zombie.dir);
      }
    }
    if (this.hit) this.hp--;
    this.game_over = this.hp <= 0;

    this.hitbox.moveTo(this.x, this.y);
  }
}
