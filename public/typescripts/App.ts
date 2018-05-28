import * as PIXI from 'pixi.js'
import {config} from "./Config";
import {Particle} from "./Particle";
import {Normal} from "./states/Nomal";
import {State} from "./states/State";
import {Circle} from "./states/Circle";
import {Trace} from "./states/Absorption";
import {Anchor} from "./states/Interfaces";
import {Purge} from "./states/Purge";
import {generateRandom} from "./Util";

const renderer = PIXI.autoDetectRenderer({
  width: config.width,
  height: config.height,
  antialias: true
})

const stage = new PIXI.Container()
stage.interactive = true
export const anchor: Anchor = {x: config.width / 2, y: config.height / 2}

const states = [new Normal(), new Circle(), new Trace(), new Purge()]
let index = 0
let state: State = states[index]
let particles

const text = new PIXI.Text('NORMAL', {
  fontStyle: 'bold Arial',
  fill: 'white'
})

text.position.x = config.width / 10
text.position.y = config.height - config.height / 5 * 4
stage.addChild(text)

PIXI.loader.add('image', config.image).load((loader, resources) => {
  particles = Array.from(Array(config.num).keys()).map((e, i) => {
    const particle = new Particle(resources.image.texture, i)
    stage.addChild(particle)
    return particle
  })

  const animate = () => {
    particles.forEach(e => e.move(state))
    renderer.render(stage)
    requestAnimationFrame(animate)
  }
  animate()
})

document.body.appendChild(renderer.view)

document.addEventListener('click', e => {
  index = index === states.length - 1 ? 0 : index + 1
  state = states[index]
  text.text = state.name
  if (state.name === 'NORMAL') {
    particles.forEach(e => {
      e.position.x = generateRandom(config.width)
      e.position.y = generateRandom(config.height)
    })
  }
})
