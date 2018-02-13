const Two = require('two.js');
const Noise = require('noisejs').Noise;

let noise = new Noise(Math.random());

let two = new Two({
    fullscreen: true,
    autostart: true
}).appendTo(document.body);

const rows = 35;
const cols = 35;
const scl = 25;
const inc = 0.0001;

let xoff = 0;
let yoff = 0;

let flowfield = new Array(rows * cols);
let lines = new Array(rows * cols);
let group = new Two.Group();

group.translation.set(
    two.width / 2 - cols * scl / 2,
    two.height / 2 - rows * scl / 2
);

function setup() {
    for (let y = 0; y < rows; ++y) {
        for (let x = 0; x < cols; ++x) {
            const idx = x + y * cols;
            const a = noise.perlin2(x / 10, y / 10);
            const vx = Math.cos(a);
            const vy = Math.sin(a);

            flowfield[idx] = new Two.Vector(vx, vy);
            lines[idx] = two.makeLine(x * scl, y * scl, x * scl + scl, y * scl);
            lines[idx].rotation = a;

            group.add(lines[idx]);
        }
    }

    console.log(group);

    two.add(group);
    two.update();
}

function draw() {
    for (let y = 0; y < rows; ++y) {
        for (let x = 0; x < cols; ++x) {
            const idx = x + y * cols;
            const a = noise.perlin3(x / 10, y / 10, xoff);
            const vx = Math.cos(a);
            const vy = Math.sin(a);
            flowfield[idx] = new Two.Vector(vx, vy);
            lines[idx].rotation = a;
            xoff += inc;
        }
    }
}

setup();
two.bind('update', draw);
