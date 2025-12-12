import "../css/style.css";
import { sketch } from "p5js-wrapper";
import HitBox from "./Box";
import Block from "./Block";
import Player from "./Player";
import Bullet from "./Bullet";
import Background from "./Background";
import Zombie from "./Zombie";

import z1 from "./zombies/zombie1.png";
import z2 from "./zombies/zombie2.png";
import z3 from "./zombies/zombie3.png";
import z4 from "./zombies/zombie4.png";
import z5 from "./zombies/zombie5.png";
import z6 from "./zombies/zombie6.png";
import totkopfimage from "./icons/totkopf.png";

import NumberDisplay from "./NumberDisplay";

import TH from "./HERZ/TOTHERZ.png";
import AH from "./HERZ/HERZ.png";
import HP from "./HP";

let ground;
let player;
let bullets = [];
let background;
let zombies = [];
let killcounter;
let killcount = 0;
let hp_bar;

let deltaTime = 5;
let spawndelay = 5000;
let lastTime;

let shootingCooldown = 0;
const cooldownConstant = 100;
let cooldownSpeedCoefficient = 0.2;

let damageAlpha = 0;
const damageAlphaSpeed = 0.2;

let zombie_images = [];

function addZombie() {
  zombies.push(new Zombie(-1000, height - 149, 30, 50, null, zombie_images));
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
  let totkopf = loadImage(totkopfimage);
  killcounter = new NumberDisplay(20, 50, 30, "red", totkopf);

  let alive_img = loadImage(AH);
  let dead_img = loadImage(TH);
  hp_bar = new HP(20, 20, 25, alive_img, dead_img);

  player = new Player(100, 100, 30, 40);
  addZombie();
  player.setColor(255, 0, 0);

  lastTime = millis();

  zombie_images.push(loadImage(z1));
  zombie_images.push(loadImage(z2));
  zombie_images.push(loadImage(z3));
  zombie_images.push(loadImage(z4));
  zombie_images.push(loadImage(z5));
  zombie_images.push(loadImage(z6));
};

let lastSpawnTime = 0;

let lastHP = 10;

sketch.draw = () => {
  deltaTime = millis() - lastTime;

  background.draw(deltaTime);

  noStroke();

  if (millis() > 2000 && millis() - lastSpawnTime >= spawndelay) {
    addZombie();
    lastSpawnTime = millis();

    if (spawndelay > 1500) {
      spawndelay *= 0.99;
      console.log(spawndelay);
    }
  }

  player.update(deltaTime, ground, zombies);

  for (let bullet of bullets) {
    bullet.update(deltaTime);
    bullet.draw();
  }

  bullets = bullets.filter((bullet) => !bullet.outOfBounds());

  for (let zombie of zombies) {
    zombie.update(deltaTime, bullets, player);
    zombie.draw();
    if (zombie.dead) {
      killcount++;
      killcounter.setValue(killcount);
    }
  }
  zombies = zombies.filter((zombie) => !zombie.dead);

  player.draw();

  ground.draw();

  killcounter.draw();
  hp_bar.draw();
  hp_bar.setHP(player.hp);

  if (player.hp < lastHP) {
    damageAlpha = 180;
  }
  lastHP = player.hp;
  if (damageAlpha > 0) {
    damageAlpha -= deltaTime * damageAlphaSpeed;
    if (damageAlpha < 0) {
      damageAlpha = 0;
    }
  }

  fill(230, 0, 0, damageAlpha);
  rect(0, 0, width, height);

  if (shootingCooldown > 0) {
    shootingCooldown -= deltaTime * cooldownSpeedCoefficient;
    if (shootingCooldown < 0) {
      shootingCooldown = 0;
    }
  }

  fill(0);
  rect(width - cooldownConstant - 20, 20, cooldownConstant, 10);
  fill(255);
  rect(width - cooldownConstant - 20, 20, shootingCooldown, 10);

  lastTime = millis();
};

sketch.keyPressed = () => {
  if (key == "w" && shootingCooldown <= 0) {
    let launch_x = player.x + player.w / 2;
    let launch_y = player.y + player.h / 3 - 13;
    bullets.push(new Bullet(launch_x, launch_y, player.dir, abs(player.x_vel)));
    shootingCooldown = cooldownConstant;
  }
};
