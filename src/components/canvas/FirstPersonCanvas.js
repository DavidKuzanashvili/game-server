import React, { useState } from 'react'
import Sketch from 'react-p5'
import { Vector } from 'p5'
import Boundery from './Models/Boundery'
import Particle from './Models/Particle'

export default function FirsPersonCanvas() {
  const [position, setPosition] = useState([])
  const [backgroundColor] = useState({ r: 28, g: 100, b: 100 })
  const [walls, setWalls] = useState([])
  const [particle, setParticle] = useState([])
  const [keyCodes] = useState({ a: 65, d: 68 })

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef)
    setPosition({
      x: p5.width / 2,
      y: p5.height / 2,
    })
    setParticle(new Particle({ x: p5.width / 2, y: p5.height / 2 }, p5, Vector))
    setWalls([
      new Boundery(20, 0, 20, p5.height, p5),
      new Boundery(p5.width / 2 - 300, 100, p5.width / 2 - 500, 100, p5),
      new Boundery(p5.width / 2 - 400, 400, p5.width / 2 - 10, 400, p5),
      new Boundery(p5.width / 2, 0, p5.width / 2, p5.height, p5),
    ])
    p5.frameRate(60)
  }

  const draw = (p5) => {
    p5.clear()
    p5.background(backgroundColor.r, backgroundColor.g, backgroundColor.b)
    p5.noStroke()
    p5.fill(255)

    walls.forEach((wall) => wall.draw())
    particle.draw(walls)
    particle.update(position.x, position.y)

    const scene = particle.getScene()

    const w = p5.width / scene.length

    p5.push()
    for (let i = 0; i < scene.length; i++) {
      p5.noStroke()
      const c = p5.map(scene[i], 0, p5.width / 2, 255, 0)
      const h = p5.map(scene[i], 0, p5.width / 2, p5.height, 0)
      p5.fill(c)
      p5.rectMode(p5.CENTER)
      p5.rect(i * w + p5.width / 2, p5.height / 2, w, h)
    }
    p5.pop()

    update(p5)
  }

  const update = (p5) => {
    if (p5.keyIsDown(keyCodes.a)) {
      particle.rotate(0.1)
    }

    if (p5.keyIsDown(keyCodes.d)) {
      particle.rotate(-0.1)
    }

    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      setPosition(Object.assign(position, { x: (position.x -= 5) }))
    }

    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      setPosition(Object.assign(position, { x: (position.x += 5) }))
    }

    if (p5.keyIsDown(p5.UP_ARROW)) {
      setPosition(Object.assign(position, { y: (position.y -= 5) }))
    }

    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      setPosition(Object.assign(position, { y: (position.y += 5) }))
    }
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}
