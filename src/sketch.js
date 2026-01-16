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
import deathScreen from "./deathScreen";

import B from "./mag/kula.png";
import EB from "./mag/tomkula.png";
import reload_source from "./mag/reload.png";

import Magazine from "./Magazine";
import Drop from "./Drop";

const startSpawnDelay = 3000;
const cooldownConstant = 100;
const damageAlphaSpeed = 0.2;
const startMaxAmmo = 5;
const maxHP = 10;

let ground;
let player;
let background;
let killcounter;
let killcount = 0;
let hp_bar;
let dead = false;

let bullets = [];
let zombies = [];
let drops = [];

let deltaTime = 5; // preliminärt värde för deltaTime
let spawndelay = startSpawnDelay;
let lastTime;

let shootingCooldown = 0;
let cooldownSpeedCoefficient = 0.05;

let damageAlpha = 0;

let maxAmmo = startMaxAmmo;

let reloading = false;

let totkopf;

let reload_image;
let magazine_ui;
let zombie_images = [];
let lastHP = 10;

let bullet_image;
let empty_image;
let alive_img;
let dead_img;

function addZombie() {
  // lägg till en ny zombie i spelet

  zombies.push(new Zombie(-1000, height - 149, 30, 50, null, zombie_images));
  if (zombies[zombies.length - 1].dir == 1) {
    zombies[zombies.length - 1].x = -200;
  } else if (zombies[zombies.length - 1].dir == -1) {
    zombies[zombies.length - 1].x = width + 200 + zombies[zombies.length - 1].w;
  }
}

sketch.setup = () => {
  // initialisera spelet, ladda in bilder
  createCanvas(700, 500);
  background = new Background();

  ground = new Block(-100, height - 100, width + 200, 100, 150, 200, 0);

  totkopf = loadImage(totkopfimage);
  reload_image = loadImage(reload_source);

  zombie_images.push(loadImage(z1));
  zombie_images.push(loadImage(z2));
  zombie_images.push(loadImage(z3));
  zombie_images.push(loadImage(z4));
  zombie_images.push(loadImage(z5));
  zombie_images.push(loadImage(z6));

  bullet_image = loadImage(B);
  empty_image = loadImage(EB);
  alive_img = loadImage(AH);
  dead_img = loadImage(TH);

  killcounter = new NumberDisplay(20, 50, 30, "red", totkopf);
  hp_bar = new HP(20, 20, 25, alive_img, dead_img);

  player = new Player(100, 100, 30, 40);
  addZombie();
  player.setColor(255, 0, 0);

  lastTime = millis();

  magazine_ui = new Magazine(
    width - 20,
    40,
    maxAmmo,
    bullet_image,
    empty_image
  );
};

function cooldownHandler(dT) {
  // hantera reloading av vapnet, samt ritar ut en cooldown-bar högst upp till höger
  if (reloading) {
    if (shootingCooldown <= 0) {
      shootingCooldown = 0;
      magazine_ui.reload();
      reloading = false;
    } else {
      shootingCooldown -= dT * cooldownSpeedCoefficient;
    }
  }

  fill(0);
  rect(width - cooldownConstant - 20, 20, cooldownConstant, 10);
  fill(255);
  rect(width - cooldownConstant - 20, 20, shootingCooldown, 10);
}

function hurtOverlay(player, dT) {
  // visar en halvgenomskinlig röd skärm när spelaren tar skada, som tonas bort över tid
  if (player.hp < lastHP) {
    damageAlpha = 180;
  }
  lastHP = player.hp;
  if (damageAlpha > 0) {
    damageAlpha -= dT * damageAlphaSpeed;
    if (damageAlpha < 0) {
      damageAlpha = 0;
    }
  }

  fill(230, 0, 0, damageAlpha);
  rect(0, 0, width, height);
}

function bulletHandler(dT) {
  // uppdatera, rita ut och ta bort kulor
  for (let bullet of bullets) {
    bullet.update(dT);
    bullet.draw();
  }

  bullets = bullets.filter((bullet) => !bullet.outOfBounds());
}

function resetGame() {
  // återställ alla variabler som förändras under spelets gång

  player;
  bullets = [];
  background;
  zombies = [];
  killcount = 0;
  hp_bar;
  dead = false;

  drops = [];

  deltaTime = 5;
  spawndelay = startSpawnDelay;
  lastTime;

  shootingCooldown = 0;

  damageAlpha = 0;
  maxAmmo = startMaxAmmo;
  reloading = false;
  magazine_ui.capacity = maxAmmo;
  magazine_ui.reload();

  player = new Player(100, 100, 30, 40);
  player.setColor(255, 0, 0);
  killcounter.setValue(killcount);

  addZombie();
}

let timePassed = 0;

sketch.draw = () => {
  deltaTime = millis() - lastTime;

  if (dead) {
    dead = deathScreen(totkopf, deltaTime, killcount);
    if (!dead) {
      resetGame();
    }
    lastTime = millis();
    return;
  }

  if (player.hp <= 0 && !dead) {
    dead = true;
  }

  timePassed += deltaTime;

  background.draw(deltaTime);

  noStroke();

  if (timePassed > spawndelay) {
    timePassed = 0;
    addZombie();
    if (spawndelay > 1500) {
      spawndelay *= 0.99;
    }
  }

  player.update(deltaTime, ground, zombies);

  bulletHandler(deltaTime);

  for (let c_drop of drops) {
    c_drop.draw(deltaTime);

    if (player.hitbox.intersectsWith(c_drop.hitbox)) {
      if (c_drop.type.drop_type == "hp") {
        player.hp++;
        if (player.hp > maxHP) {
          player.hp = maxHP;
        }
      } else if (c_drop.type.drop_type == "ammo") {
        if (magazine_ui.bulletsLeft < magazine_ui.capacity - 3) {
          magazine_ui.bulletsLeft += 3;
        } else {
          magazine_ui.bulletsLeft = magazine_ui.capacity;
        }
      }

      drops = drops.filter((d) => d != c_drop);
    }
  }

  for (let zombie of zombies) {
    zombie.update(deltaTime, bullets, player);
    zombie.draw();
    if (zombie.dead) {
      killcount++;
      killcounter.setValue(killcount);

      // chans för dropp: 1/3
      if (floor(random(0, 3)) == 0) {
        drops.push(new Drop(zombie, alive_img, bullet_image));
      }
    }
  }
  zombies = zombies.filter((zombie) => !zombie.dead);

  drops = drops.filter((drop) => !drop.remove);

  if (magazine_ui.bulletsLeft == 0 && !reloading) {
    let r_size = 40;
    image(
      reload_image,
      width / 2 - r_size / 2,
      height / 2 - r_size / 2,
      r_size,
      r_size
    );
  }

  player.draw();
  //ground.draw();
  killcounter.draw();
  hp_bar.draw();
  hp_bar.setHP(player.hp);

  magazine_ui.draw();

  hurtOverlay(player, deltaTime);
  cooldownHandler(deltaTime);

  lastTime = millis();
};

sketch.keyPressed = () => {
  // hantering av skjutning
  if (key == "w" && magazine_ui.bulletsLeft > 0 && !reloading) {
    let launch_x = player.x + player.w / 2;
    let launch_y = player.y + player.h / 3 - 5;
    bullets.push(new Bullet(launch_x, launch_y, player.dir, abs(player.x_vel)));
    magazine_ui.use();
  }

  // hantering av omladdning av magasinet
  if (
    key == "r" &&
    magazine_ui.bulletsLeft < magazine_ui.capacity &&
    !reloading
  ) {
    reloading = true;
    shootingCooldown = cooldownConstant;
  }
};
