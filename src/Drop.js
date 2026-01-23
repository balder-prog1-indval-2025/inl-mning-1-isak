import HitBox from "./Box";

export default class Drop {
  #x;
  #y;
  #size;
  #display_size;
  #animation_swell_angle;
  #types;
  #lifespan;

  constructor(zombie, heart_image, ammo_image) {
    this.#x = zombie.x;
    if (zombie.dir == 1) {
      this.#x = zombie.x + 15;
    }
    this.#y = zombie.y + 20;
    this.#size = 23;
    this.#display_size = this.#size;

    this.hitbox = new HitBox(this.#x, this.#y, 0, 0, this.#size, this.#size);

    this.#animation_swell_angle = 0; // variabel för sinusfunktionens vinkel, ingen faktisk vinkel i denna kod

    this.#types = [
      { drop_type: "hp", sprite: heart_image },
      { drop_type: "ammo", sprite: ammo_image },
    ];

    this.type = random(this.#types);

    this.#lifespan = 10;
    this.remove = false;
  }

  draw(dt) {
    // visar den valda drop-typen med en sinusoidal upp-och-ned rörelse samt växande och krympande effekt
    this.#animation_swell_angle += dt / 120;
    this.#display_size =
      this.#size + sin(this.#animation_swell_angle) * (this.#size * 0.1);

    // ta reda på koordinater för mitten av grejen
    let middle_x = this.#x + this.#size / 2;
    let middle_y = this.#y + this.#size / 2;

    // rörelse i y-led
    let y_offset = sin(this.#animation_swell_angle * 0.5) * 3;

    image(
      this.type.sprite,
      middle_x - this.#display_size / 2,
      middle_y - this.#display_size / 2 + y_offset,
      this.#display_size,
      this.#display_size
    );

    this.#lifespan = this.#lifespan - dt / 1000;

    if (this.#lifespan <= 0) {
      this.remove = true;
    }
  }
}
