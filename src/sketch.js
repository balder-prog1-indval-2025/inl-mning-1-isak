import "../css/style.css";
import { sketch } from "p5js-wrapper";
import HitBox from "./Box";
import Block from "./Block";
import Player from "./Player";

let ground;

let player;

let deltaTime = 5;
let lastTime;

sketch.setup = () => {
  createCanvas(700, 500);
  ground = new Block(0, height - 100, width, 100, 150, 200, 0);

  player = new Player(100, 100, 30, 40);
  player.setColor(255, 0, 0);
  lastTime = millis();
};

sketch.draw = () => {
  deltaTime = millis() - lastTime;

  background(0, 100, 200);
  noStroke();

  player.update(deltaTime, ground);

  ground.draw();
  player.draw();

  lastTime = millis();
};
