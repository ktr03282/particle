import * as PIXI from 'pixi.js'
import {config} from "./Config";
import {State} from "./states/State";
import Sprite = PIXI.Sprite;
import Texture = PIXI.Texture;
import {generateRandom, generateVector} from "./Util";

export class Particle extends Sprite {
  private _vx: number
  private _vy: number
  private _index: number
  private _rotationSpeed: number

  constructor(texture: Texture, index: number) {
    super(texture)
    this.scale.x = 0.25
    this.scale.y = 0.25
    this.tint = 0xFFFFFF * Math.random()
    this.anchor.x = 0.5
    this.anchor.y = 0.5
    const rnd = config.rotationSpeed
    this._rotationSpeed = [rnd, -rnd][Math.floor(Math.random() * 2)]
    this.rotation += Math.random() * 5

    this.position.x = generateRandom(config.width)
    this.position.y = generateRandom(config.height)
    this.index = index

    while (!this.vx && !this.vy) {
      this.vx = generateVector()
      this.vy = generateVector()
    }
  }

  move(state: State): void {
    const p = state.move(this)
    this.rotation += this._rotationSpeed

    this.position.set(p.x, p.y)
  }

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  get vx(): number {
    return this._vx;
  }

  set vx(value: number) {
    this._vx = value;
  }

  get vy(): number {
    return this._vy;
  }

  set vy(value: number) {
    this._vy = value;
  }
}
