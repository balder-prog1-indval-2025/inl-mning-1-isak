import p1 from "./player/frame0.png";
import p2 from "./player/frame1.png";
import p3 from "./player/frame2.png";
import p4 from "./player/frame3.png";
import p5 from "./player/frame4.png";
import p6 from "./player/frame5.png";
import idle_frame from "./player/idle.png";

import Entity from "./Entity";

export default class Player extends Entity {
  /**
   * Initialiserar spelare
   * @param {*} x ursprunglig x position
   * @param {*} y ursprunglig y position
   * @param {*} w bredd
   * @param {*} h höjd
   * @param {*} sprite bild för spelaren
   */
  constructor(x, y, w, h, sprite = null) {
    super(x, y, w, h, sprite);
    this.jump_power = 0.67;
    this.target_x_vel = 0;
    this.hp = 10;
    this.game_over = false;
    this.hit = false;
    this.hitCooldown = 0;

    // ladda in alla bilder för spelarens animation och lagra i en array
    this.p1 = loadImage(p1);
    this.p2 = loadImage(p2);
    this.p3 = loadImage(p3);
    this.p4 = loadImage(p4);
    this.p5 = loadImage(p5);
    this.p6 = loadImage(p6);

    this.frames = [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6];

    this.idle = loadImage(idle_frame);
  }

  update(dT, ground, zombies) {
    this.y_vel += this.gravid;

    // rärelse med A och D
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

    if (this.hitbox.intersectsWith(ground.hitbox)) {
      this.y_vel = 0;
      this.ground_y = ground.y - this.h - 2;
      this.y = ground.y - this.h + 1;
      this.grounded = true;
    } else {
      this.y += this.y_vel * dT;

      this.grounded = false;
    }
    if (keyIsDown(32) && this.grounded) {
      this.y_vel = -this.jump_power;
      this.y = this.ground_y;
      this.grounded = false;
    }

    // kolla efter och hantera kollision med zombies
    this.hit = false;
    for (let zombie of zombies) {
      if (zombie.hitbox.intersectsWith(this.hitbox)) {
        // kollisionshantering - flytta isär spelaren och zombien
        const overlapX = Math.min(
          this.x + this.w - zombie.x,
          zombie.x + zombie.w - this.x
        );

        if (this.x < zombie.x) {
          this.x -= overlapX / 2;
          zombie.x += overlapX / 2;
        } else {
          this.x += overlapX / 2;
          zombie.x -= overlapX / 2;
        }

        this.hit = true;
        zombie.dir = -zombie.dir;
      }
    }

    // tar hp från spelaren om cooldownen har runnit ut och återställer därefter cooldownen
    if (this.hit && this.hitCooldown <= 0) {
      this.hp--;
      console.log(this.hp);
      this.hitCooldown = 1000;
    }

    // hantering av cooldown
    if (this.hitCooldown > 0) {
      this.hitCooldown -= dT;
      if (this.hitCooldown < 0) this.hitCooldown = 0;
    }

    this.game_over = this.hp <= 0;
    this.hitbox.moveTo(this.x, this.y);
  }

  /**
   * Hanterar ritning av spelaren med animation
   * @returns
   */
  draw() {
    // väljer animationsframe baserat på p5js inbyggda variabel frameCount
    const frameIndex = Math.floor(frameCount / 5) % this.frames.length;
    const currentFrame =
      abs(this.x_vel) > 0.1 ? this.frames[frameIndex] : this.idle; // völjer idle-bild om spelaren står stilla, annars frame utifrån frameIndex

    //console.log(this.x_vel);

    const imgWidth = this.w * 2.3;
    const imgHeight = currentFrame.height * (imgWidth / currentFrame.width);

    if (this.dir == 1) {
      image(currentFrame, this.x - 18, this.y - 26, imgWidth, imgHeight);
    } else {
      // push, translate, sccale och pop används för att spegla bilden horisontellt när spelaren rör sig åt vänster
      push();
      translate(this.x + (this.w * 1.5) / 2, 0);
      scale(-1, 1); // spegelvändning
      image(
        currentFrame,
        (-this.w * 1.5) / 2 - 3,
        this.y - 26,
        imgWidth,
        imgHeight
      );
      pop();
      return;
    }
  }
}
