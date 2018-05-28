import {Points, State} from "./State";
import {Particle} from "../Particle";
import {Anchor} from "./Interfaces";
import {config} from "../Config";
import {getDistance} from "../Util";

export class Trace extends State {
  name: string;
  private _anchor: Anchor

  constructor() {
    super('ABSORPTION')
    this.anchor = {x: config.width / 2, y: config.height / 2}
    document.addEventListener('mousemove', e => this.anchor = {x: e.clientX, y: e.clientY})
  }

  move(p: Particle): Points {
    const point: Anchor = {
      x: p.position.x + (this.anchor.x - p.position.x) / 20,
      y: p.position.y+ (this.anchor.y - p.position.y) / 20
    }

    if (getDistance(point.x, point.y, this.anchor.x, this.anchor.y) < 30) {
      point.x += Math.random() * 400 - Math.random() * 400
      point.y += Math.random() * 400 - Math.random() * 400
    }

    return point;
  }

  get anchor(): Anchor {
    return this._anchor;
  }

  set anchor(value: Anchor) {
    this._anchor = value;
  }
}
