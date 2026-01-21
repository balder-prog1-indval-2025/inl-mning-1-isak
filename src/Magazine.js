// magasinklass som håller koll på ammunition, samt ritar ut magasinet på skärmen
export default class Magazine {
  #bullet_image;
  #empty_image;
  #image_size;

  constructor(rx, y, capacity, bullet_image, empty_image) {
    this.y = y;
    this.capacity = capacity;
    this.bulletsLeft = capacity;
    this.#bullet_image = bullet_image;
    this.#empty_image = empty_image;
    this.#image_size = 20;
    this.x = rx - this.#image_size * this.capacity;
  }

  draw() {
    for (let i = 0; i < this.capacity; i++) {
      if (i < this.bulletsLeft) {
        image(
          this.#bullet_image,
          this.x + i * this.#image_size,
          this.y,
          this.#image_size,
          this.#image_size
        );
      } else {
        image(
          this.#empty_image,
          this.x + i * this.#image_size,
          this.y,
          this.#image_size,
          this.#image_size
        );
      }
    }
  }

  use() {
    if (this.bulletsLeft > 0) {
      this.bulletsLeft--;
      return true;
    }
    return false;
  }

  reload() {
    this.bulletsLeft = this.capacity;
  }
}
