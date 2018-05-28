import {config} from "./Config";

export const generateVector = (): number => {
  return Math.random() * config.vector - Math.random() * config.vector
}

export const getDistance = (x1, y1, x2, y2): number => {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
}

export const getRadian = (x1, y1, x2, y2): number => {
  return Math.atan2(y2 - y1, x2 - x1)
}

export const degreeToRadian = (degree: number): number => {
  return degree * Math.PI / 180
}

export const generateRandom = (seed): number => {
  return Math.random() * seed
}
