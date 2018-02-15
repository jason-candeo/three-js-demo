import { Point, add } from "../core/test.rs";

console.log(add(1, 1));

const rows = 40;
const cols = 40;
const scl = 20;

let zoff = 0;
const inc = 0.05;
const zinc = 0.00075;

let flowfeild = [];

function update_field() {
  let yoff = 0;
  for (let y = 0; y < rows; ++y) {
    let xoff = 0;
    for (let x = 0; x < cols; ++x) {
      const idx = x + y * cols;

      const a = noise(xoff, yoff, zoff) * (TWO_PI * 2);
      const v = p5.Vector.fromAngle(a);
      // const vx = Math.cos(a);
      // const vy = Math.sin(a);

      flowfeild[idx] = v;

      xoff += inc;
    }
    yoff += inc;

    zoff += zinc;
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  update_field();
}

function draw() {
  background(255);
  fill(0);
  // ellipse(mouseX, mouseY, 80, 80);

  update_field();

  for (let y = 0; y < rows; ++y) {
    for (let x = 0; x < cols; ++x) {
      const idx = x + y * cols;

      const v = flowfeild[idx];

      push();
      translate(
        x * scl + window.innerWidth / 2 - cols * scl / 2,
        y * scl + window.innerHeight / 2 - rows * scl / 2
      );
      rotate(v.heading());
      line(0, 0, scl, 0);
      pop();
    }
  }
}
