import "../css/style.css";
import { sketch } from "p5js-wrapper";
import HitBox from "./Box";
import Block from "./Block";
import Player from "./Player";
import Bullet from "./Bullet";
import Background from "./Background";
import Zombie from "./Zombie";

let ground;
let player;
let bullets = [];
let background;
let zombies = [];

let deltaTime = 5;
let lastTime;

function addZombie() {
  zombies.push(new Zombie(-1000, height - 149, 30, 50));
  if (zombies[zombies.length - 1].dir == 1) {
    zombies[zombies.length - 1].x = -200;
  } else if (zombies[zombies.length - 1].dir == -1) {
    zombies[zombies.length - 1].x = width + 200 + zombies[zombies.length - 1].w;
  }
}

sketch.setup = () => {
  createCanvas(700, 500);
  background = new Background();
  ground = new Block(-100, height - 100, width + 200, 100, 150, 200, 0);

  player = new Player(100, 100, 30, 40);
  addZombie();
  player.setColor(255, 0, 0);

  lastTime = millis();
};

sketch.draw = () => {
  deltaTime = millis() - lastTime;

  background.draw();

  noStroke();

  player.update(deltaTime, ground, zombies);

  for (let bullet of bullets) {
    bullet.update(deltaTime);
    bullet.draw();
  }

  bullets = bullets.filter((bullet) => !bullet.outOfBounds());

  for (let zombie of zombies) {
    zombie.update(deltaTime, bullets, player);
    zombie.draw();
  }
  zombies = zombies.filter((zombie) => !zombie.dead);

  player.draw();

  ground.draw();

  lastTime = millis();
};

sketch.keyPressed = () => {
  if (key == "w") {
    let launch_x = player.x + player.w / 2;
    let launch_y = player.y + player.h / 3;
    bullets.push(new Bullet(launch_x, launch_y, player.dir, abs(player.x_vel)));
  }
};
