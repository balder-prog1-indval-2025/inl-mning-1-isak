import m1 from "./moln/m1.png";
import m2 from "./moln/m2.png";
import m3 from "./moln/m3.png";
import m4 from "./moln/m4.png";

export default class Background {
  constructor() {
    this.m1 = loadImage(m1);
    this.m2 = loadImage(m2);
    this.m3 = loadImage(m3);
    this.m4 = loadImage(m4);

    this.cloud_assets = [this.m1, this.m2, this.m3, this.m4];
    this.clouds = [];
    this.addCloud();
    this.addCloud();
    this.addCloud();
    this.addCloud();
    this.addCloud();
    this.addCloud();
    this.addCloud();
  }

  addCloud() {
    let dir = round(random(0, 1)) * 2 - 1;

    if (dir == 1) {
      this.clouds.push({
        img: random(this.cloud_assets),
        x: -random(200, 400),
        y: random(-20, 150),
        w: random(180, 240),
        speed: random(0.005, 0.02),
        dir: dir,
      });
    } else {
      this.clouds.push({
        img: random(this.cloud_assets),
        x: width + random(0, 200),
        y: random(-20, 150),
        w: random(180, 240),
        speed: random(0.005, 0.02),
        dir: dir,
      });
    }
  }

  draw(dT) {
    background(100, 50, 200);
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
  }
}
