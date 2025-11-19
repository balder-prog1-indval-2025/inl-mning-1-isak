import "../css/style.css";
import { sketch } from "p5js-wrapper";
import HitBox from "./Box";
import Block from "./Block";
import Player from "./Player";

let blobbe;
let ground;

let player;

sketch.setup = () => {
  createCanvas(800, 600);
  blobbe = new Block(200, 200, 200, 50);
  blobbe.setColor(100, 100, 2);
  ground = new Block(0, height - 100, width, 100, 150, 200, 0);

  player = new Player(200, 200, 50, 50);
};

sketch.draw = () => {
  background(0, 100, 200);
  ground.draw();
  blobbe.draw();
  player.draw();
};
