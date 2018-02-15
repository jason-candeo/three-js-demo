import * as THREE from 'three';
import { Noise } from 'noisejs';
import * as sharp from 'sharp';

const textedSVG = new sharp.Buffer(`<svg>
  <rect x="0" y="0" width="175" height="75" />
  <text x="0" y="0" font-size="16" fill="#fff">${'hello world'}</text>
</svg>`);

let img = sharp()
    .overlayWith(textedSVG, { gravity: 'center' })
    .toBuffer()
    .then(data => {
        console.log(data);
    });

// import * as Jimp from 'jimp';
// import 'jimp';

// console.log((window as any).Jimp);

let noise = new Noise(Math.random());

let scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    line: THREE.Line;
let geometry: THREE.BufferGeometry,
    positions: Float32Array,
    material: THREE.LineBasicMaterial;

const rows = (9 * 7.3) | 0;
const cols = (rows * (window.innerWidth / window.innerHeight)) | 0;
// const rows = 9 * 6;
// const cols = 19 * 6;
const scl = 1.5; // scale

// Jimp()

// Jimp.

// let image = new Jimp(cols, rows, (err, image) => {});

console.log(rows, cols, scl);

const offx = cols * scl / 2 - scl / 2;
const offy = rows * scl / 2 - scl / 2;
let zinc = 0;
const inc = 0.01;

let lines: { geometry: THREE.Geometry; shape: THREE.Line }[] = new Array(
    rows * cols
);

function setup() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        500
    );

    camera.position.set(0, 0, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    console.log(renderer.getPixelRatio());
    document.body.appendChild(renderer.domElement);

    material = new THREE.LineBasicMaterial({ color: 0xffffff });

    for (let y = 0; y < rows; ++y) {
        for (let x = 0; x < cols; ++x) {
            const idx = x + y * cols;

            const geometry = new THREE.Geometry();
            geometry.vertices.push(
                new THREE.Vector3(x * scl - offx, y * scl - offy, 0),
                new THREE.Vector3(x * scl + scl - offx, y * scl - offy)
            );
            geometry.verticesNeedUpdate = true;

            const line = new THREE.Line(geometry, material);

            line.material = new THREE.LineBasicMaterial({ color: 0xffffff });

            lines[idx] = {
                geometry,
                shape: line
            };
        }
    }

    console.log(lines[0].shape);

    for (let i = 0; i < lines.length; ++i) {
        scene.add(lines[i].shape);
    }
}

function animate() {
    requestAnimationFrame(animate);

    for (let y = 0; y < rows; ++y) {
        for (let x = 0; x < cols; ++x) {
            const idx = x + y * cols;

            const a = noise.perlin3(x / 10, y / 10, zinc);
            const vx = Math.cos(a);
            const vy = Math.sin(a);

            (lines[idx].shape.geometry as THREE.Geometry).vertices[1].x =
                x * scl + vx * scl - offx;
            (lines[idx].shape.geometry as THREE.Geometry).vertices[1].y =
                y * scl + vy * scl - offy;
            (lines[idx].shape.geometry as any).verticesNeedUpdate = true;

            (lines[idx].shape.material as any).color.setHSL(0.5, 1, a);
            // lines[idx].shape.geometry.rotateZ(a);
        }
    }

    zinc += inc;

    renderer.render(scene, camera);
}

setup();
animate();
