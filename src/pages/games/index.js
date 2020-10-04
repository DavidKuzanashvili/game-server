import React, { Component } from 'react'
import Canvas from '../../components/canvas/Canvas'

class Games extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <Canvas />
      </div>
    )
  }
}

export default Games
