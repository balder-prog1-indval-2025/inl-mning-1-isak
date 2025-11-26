import "../css/style.css";
import { sketch } from "p5js-wrapper";
import HitBox from "./Box";
import Block from "./Block";
import Player from "./Player";
import Background from "./Background";

let ground;
let background;
let player;

let deltaTime = 5;
let lastTime;

sketch.setup = () => {
  createCanvas(700, 500);
  background = new Background();
  ground = new Block(-100, height - 100, width + 200, 100, 150, 200, 0);

  player = new Player(100, 100, 30, 40);
  player.setColor(255, 0, 0);
  lastTime = millis();
};

sketch.draw = () => {
  deltaTime = millis() - lastTime;

  background.draw();

  noStroke();

  player.update(deltaTime, ground);

  player.draw();
  ground.draw();

  lastTime = millis();
};
