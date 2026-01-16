let angle = 0;

/**
 * Ritar ut en game-over skärm med en dödskalle och text.
 * @param {*} tk dödskalle bild
 * @param {*} deltaTime deltatime
 * @returns boolean true to keep player dead, false to restart game
 */
export default function deathScreen(tk, deltaTime, killcount) {
  // enkelt highscore-system med localStorage
  let highscore = localStorage.getItem("kc");
  if (highscore === null || killcount > highscore) {
    localStorage.setItem("kc", killcount);
  }

  angle += deltaTime / 200;
  let scale = Math.sin(angle) / 15 + 1;

  fill(0);
  rect(0, 0, width, height);

  image(tk, width / 2 - tk.width / 2.5, height / 2 - 150, 200, 200);

  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(45);
  text("GAME OVER", width / 2, height / 2 + 90);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30 * scale);
  text("PRESS SPACE TO PLAY AGAIN", width / 2, height / 2 + 140);

  text(killcount + " ZOMBIES KILLED", width / 2, height / 2 + 200);
  text(
    "BEST: " + localStorage.getItem("kc") + " ZOMBIES",
    width / 2,
    height / 2 + 240
  );

  //return true to keep player dead, false to restart game
  return !keyIsDown(32);
}
