import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import Sketch from 'react-p5'
const ENDPOINT = 'http://127.0.0.1:4001'

export default function Canvas() {
  const [positions, setPositions] = useState([])
  const [socket, setSocket] = useState({})

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on('positions', (data) => {
      console.log(data)
      setPositions(data)
    })
    setSocket(socket)
  }, [])

  const setup = (p5, canvasParentRef) => {
    // window.addEventListener('visibilitychange', () => {
    //   socket.emit('getPlayers')
    // })
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef)
    p5.frameRate(60)
    // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  }

  const draw = (p5) => {
    p5.clear()
    p5.background(0)
    p5.fill(234, 31, 81)
    p5.noStroke()
    positions.forEach((position) => {
      p5.rect(position.x, position.y, 50, 50)
    })
    update(p5)
  }

  const update = (p5) => {
    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      socket.emit('move', 'left')
    }

    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      socket.emit('move', 'right')
    }

    if (p5.keyIsDown(p5.UP_ARROW)) {
      socket.emit('move', 'up')
    }

    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      socket.emit('move', 'down')
    }
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />
}
