import * as THREE from 'three';
import { Noise } from 'noisejs';

let noise = new Noise(Math.random());

let scene, camera, renderer;
let geometry, material, cube, line;

const rows = 60;
const cols = 60;
const scl = 1.2; // scale

const offx = cols * scl / 2;
const offy = rows * scl / 2;
let zinc = 0;
const inc = 0.001;

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
    document.body.appendChild(renderer.domElement);

    material = new THREE.LineBasicMaterial({ color: 0xffffff });
    // geometry = new THREE.Geometry();
    // geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    // geometry.vertices.push(new THREE.Vector3(0, 10, 0));
    // geometry.vertices.push(new THREE.Vector3(10, 0, 0));
    // geometry.vertices.push(new THREE.Vector3(20, 10, 0));

    // line = new THREE.Line(geometry, material);

    // scene.add(line);

    for (let y = 0; y < rows; ++y) {
        for (let x = 0; x < cols; ++x) {
            const idx = x + y * cols;

            const geometry = new THREE.Geometry();
            geometry.vertices.push(
                new THREE.Vector3(x * scl - offx, y * scl - offy, 0),
                new THREE.Vector3(x * scl + scl - offx, y * scl - offy)
            );

            const line = new THREE.Line(geometry, material);

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

            (lines[idx].shape.geometry as any).vertices[1].x =
                x * scl + vx * scl - offx;
            (lines[idx].shape.geometry as any).vertices[1].y =
                y * scl + vy * scl - offy;
            (lines[idx].shape.geometry as any).verticiesNeedUpdate = true;
            // lines[idx].shape.geometry.rotateZ(a);
        }
    }

    zinc += inc;

    renderer.render(scene, camera);
}

setup();
animate();
