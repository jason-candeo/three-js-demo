import { Vector } from 'ts-vector';
import { Vector2, Vector3 } from 'three';

class Particle {
    private _pos: Vector2;
    private _vel: Vector2;
    private _acc: Vector2;

    constructor(pos = new Vector2(0, 0)) {
        this._pos = pos;
        this._acc = new Vector2(0, 0);
        this._vel = new Vector2(0, 0);
    }

    update() {
        this._vel.add(this._acc);
        this._pos.add(this._vel);
        this._acc.multiplyScalar(0);
    }
}
