import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import Sketch from 'react-p5'
const ENDPOINT = 'http://localhost:4001'

export default function Canvas() {
  const [positions, setPositions] = useState([])
  const [socket, setSocket] = useState({})
  const [backgroundColor, setBackgroundColor] = useState({ r: 0, g: 0, b: 0 })

  useEffect(() => {
    const options = {
      'force new connection': true,
      reconnectionAttempts: 'infinity',
      timeout: 10000,
      transports: ['websocket'],
    }
    const socket = socketIOClient(ENDPOINT, options)
    socket.on('positions', (data) => {
      console.log(data)
      setPositions(data)
    })
    socket.on('backgroundColor', (data) => {
      console.log(data)
      setBackgroundColor(data)
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
    p5.background(backgroundColor.r, backgroundColor.g, backgroundColor.b)
    p5.noStroke()
    positions.forEach((position) => {
      p5.fill(position.color.r, position.color.g, position.color.b)
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
