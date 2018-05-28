import {Particle} from "../Particle";

export abstract class State {
  abstract name: string

  abstract move(p: Particle): Points

  constructor(name: string) {
    this.name = name
  }
}

export interface Points {
  x: number
  y: number
}
