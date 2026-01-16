import HitBox from "./Box";

export default class Drop {
  constructor(zombie, heart_image, ammo_image) {
    this.x = zombie.x;
    if (zombie.dir == 1) {
      this.x = zombie.x + 15;
    }
    this.y = zombie.y + 20;
    this.size = 23;
    this.display_size = this.size;
    this.hitbox = new HitBox(this.x, this.y, 0, 0, this.size, this.size);

    this.animation_swell_angle = 0;

    this.types = [
      { drop_type: "hp", sprite: heart_image },
      { drop_type: "ammo", sprite: ammo_image },
    ];

    this.type = random(this.types);

    this.lifelegnth = 5;
    this.remove = false;
  }

  draw(dt) {
    this.animation_swell_angle += dt / 120;
    this.display_size =
      this.size + sin(this.animation_swell_angle) * (this.size * 0.1);

    this.middle_x = this.x + this.size / 2;
    this.middle_y = this.y + this.size / 2;

    this.y_offset = sin(this.animation_swell_angle * 0.5) * 3;

    this.lifelegnth = this.lifelegnth - dt / 1000;

    if (this.lifelegnth <= 0) {
      this.remove = true;
    }

    image(
      this.type.sprite,
      this.middle_x - this.display_size / 2,
      this.middle_y - this.display_size / 2 + this.y_offset,
      this.display_size,
      this.display_size
    );
  }
}
