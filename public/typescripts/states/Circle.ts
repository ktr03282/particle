import {Points, State} from "./State";
import {Particle} from "../Particle";
import {config} from "../Config";
import {degreeToRadian, getDistance, getRadian} from "../Util";
import {Anchor} from "./Interfaces";

export class Circle extends State {
  name: string
  _anchor: Anchor
  private _goals
  private _radius

  constructor() {
    super('CIRCLE')
    this.anchor = {x: config.width / 2, y: config.height / 2}

    this.radius = config.width > config.height ? config.width / 4 : config.height / 4
    this.goals = Array.from(Array(config.num).keys())
      .map((e, i) => {
        const radian = degreeToRadian(360 / config.num * i)
        return {
          x: this.anchor.x + this.radius * Math.cos(radian),
          y: this.anchor.y + this.radius * Math.sin(radian)
        }
      })
  }

  move(p: Particle): Points {
    this.goals = this.moveGoal()

    let point: Points = {x: p.position.x, y: p.position.y}
    if (getDistance(p.position.x, p.position.y, this.goals.x, this.goals.y) < 0.5) {
      point.x = this.goals[p.index].x
      point.y = this.goals[p.index].y
    } else {
      point.x = p.position.x + (this.goals[p.index].x - p.position.x) / 20
      point.y = p.position.y + (this.goals[p.index].y - p.position.y) / 20
    }

    return {x: point.x, y: point.y};
  }

  moveGoal(): void {
    return this.goals.map(e => {
      let radian = getRadian(this.anchor.x, this.anchor.y, e.x, e.y)
      radian += degreeToRadian(0.0008)

      const x = this.anchor.x + this.radius * Math.cos(radian)
      const y = this.anchor.y + this.radius * Math.sin(radian)
      return {x: x, y: y}
    })
  }

  get anchor(): Anchor {
    return this._anchor;
  }

  set anchor(value: Anchor) {
    this._anchor = value;
  }

  get goals() {
    return this._goals;
  }

  set goals(value) {
    this._goals = value;
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    this._radius = value;
  }
}
