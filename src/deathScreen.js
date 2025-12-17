export default function deathScreen() {
  fill(0);
  rect(0, 0, width, height);

  //return true to keep player dead, false to restart game
  return !keyIsDown(32);
}
