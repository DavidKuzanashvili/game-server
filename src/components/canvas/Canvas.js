import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import Sketch from 'react-p5'
const ENDPOINT = 'http://127.0.0.1:4001'

export default class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = { positions: [], socket: {} }
  }

  componentDidMount() {
    const socket = socketIOClient(ENDPOINT)
    socket.on('positions', (data) => {
      this.setState({ positions: data })
      console.log(data)
    })
    this.setState({ socket: socket })
  }

  setup = (p5, canvasParentRef) => {
    // window.addEventListener('visibilitychange', () => {
    //   this.state.socket.emit('getPlayers')
    // })
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef)
    p5.frameRate(this.fr)
    // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  }

  draw = (p5) => {
    p5.clear()
    p5.background(0)
    p5.fill(234, 31, 81)
    p5.noStroke()
    this.state.positions.forEach((position) => {
      p5.rect(position.x, position.y, 50, 50)
    })
    this.update(p5)
  }

  update = (p5) => {
    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      this.state.socket.emit('move', 'left')
    }

    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      this.state.socket.emit('move', 'right')
    }

    if (p5.keyIsDown(p5.UP_ARROW)) {
      this.state.socket.emit('move', 'up')
    }

    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      this.state.socket.emit('move', 'down')
    }
  }

  windowResized = (p5) => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight)
  }

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />
  }
}
