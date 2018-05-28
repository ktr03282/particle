import {Points, State} from "./State";
import {config} from "../Config";
import {Particle} from "../Particle";

export class Normal extends State {
  name: string

  constructor() {
    super('NORMAL')
  }

  move(p: Particle): Points {
    const x = p.position.x + p.vx
    const y = p.position.y + p.vy

    return {
      x: x > config.width ? 0 : x < 0 ? config.width : x,
      y: y > config.height ? 0 : y < 0 ? config.height : y
    }
  }
}
