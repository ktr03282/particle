import {Points, State} from "./State";
import {Particle} from "../Particle";
import {config} from "../Config";
import {Anchor} from "./Interfaces";
import {getDistance} from "../Util";

export class Purge extends State {
  name: string;
  private _anchor: Anchor

  constructor() {
    super('PURGE')
    this.anchor = {x: config.width / 2, y: config.height / 2}
    document.addEventListener('mousemove', e => this.anchor = {x: e.clientX, y: e.clientY})
  }

  move(p: Particle): Points {
    const point: Anchor = {
      x: p.position.x - (this.anchor.x - p.position.x) / 30,
      y: p.position.y - (this.anchor.y - p.position.y) / 30
    }

    if (getDistance(point.x, point.y, this.anchor.x, this.anchor.y) > config.height) {
      point.x = this.anchor.x + Math.random() * 30 - Math.random() * 30
      point.y = this.anchor.y + Math.random() * 30 - Math.random() * 30
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
