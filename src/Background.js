import m1 from "./moln/m1.png";
import m2 from "./moln/m2.png";
import m3 from "./moln/m3.png";
import m4 from "./moln/m4.png";

import f1 from "./Houses/Fabrik1.png";
import f2 from "./Houses/Fabrik2.png";
import f3 from "./Houses/Fabrik3.png";
import f4 from "./Houses/Fabrik4.png";
import f5 from "./Houses/Fabrik5.png";

import burg from "./Houses/Burg.png";

import city from "./Houses/city.png";

export default class Background {
  constructor() {
    this.m1 = loadImage(m1);
    this.m2 = loadImage(m2);
    this.m3 = loadImage(m3);
    this.m4 = loadImage(m4);

    this.f1 = loadImage(f1);
    this.f2 = loadImage(f2);
    this.f3 = loadImage(f3);
    this.f4 = loadImage(f4);
    this.f5 = loadImage(f5);

    this.burg = loadImage(burg);

    this.city = loadImage(city);

    this.cloud_assets = [this.m1, this.m2, this.m3, this.m4];
    this.clouds = [];
    this.addCloud();
    this.addCloud();
    this.addCloud();
    this.addCloud();
    this.addCloud();
    this.addCloud();
    this.addCloud();

    this.fabrik_assets = [this.f1, this.f2, this.f3, this.f4, this.f5];
  }

  addCloud() {
    let dir = round(random(0, 1)) * 2 - 1;

    this.clouds.push({
      img: random(this.cloud_assets),
      x: random(-500, width + 500),
      y: random(-20, 150),
      w: random(180, 240),
      speed: random(0.005, 0.02),
      dir: dir,
    });
  }

  draw(dT) {
    background(80, 80, 240);
    noStroke();
    for (let cloud of this.clouds) {
      if (cloud.dir == 1 && cloud.x > width + 100) {
        cloud.dir = -1;
      } else if (cloud.dir == -1 && cloud.x < -cloud.w - 100) {
        cloud.dir = 1;
      }

      cloud.x += cloud.speed * dT * cloud.dir;
      image(
        cloud.img,
        cloud.x,
        cloud.y,
        cloud.w,
        cloud.w * (cloud.img.height / cloud.img.width)
      );
    }

    const imgWidth = width;
    const imgHeight = this.city.height * (imgWidth / this.city.width);

    image(this.city, 0, 100, width, imgHeight);
  }
}
