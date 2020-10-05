module.exports = class GameBuilder {
  constructor(positions, client, socket) {
    this.positions = positions || []
    this.client = client
    this.socket = socket
    this.colors = []
  }

  emitPositions() {
    this.socket.emit('positions', this.positions)

    return this
  }

  actOnEvent() {
    const position = this.getPositionById(this.client.id)
    if (!position) return
    this.client.on('move', (data) => {
      switch (data) {
        case 'left':
          position.x -= 5
          break
        case 'right':
          position.x += 5
          break
        case 'up':
          position.y -= 5
          break
        case 'down':
          position.y += 5
          break
      }

      this.socket.emit('positions', this.positions)
    })

    return this
  }

  addPosition(id) {
    let position = this.getPositionById(id)
    if (!position) {
      const color = {
        positionId: id,
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255),
      }
      position = {
        id: id,
        x: 0,
        y: 0,
        color,
      }

      for (let i = 0; this.colors.length; ++i) {
        const index = (i + 1) % this.colors.length
        this.colors[index].positionId = this.positions[i].id
        this.positions[i].color = this.colors[index]
        console.log(this.positions[i], this.colors[index])
      }
      this.colors.push(color)
      this.positions.push(position)
      this.socket.emit('backgroundColor', position.color)
    }

    return this
  }

  removePosition(id) {
    const index = this.positions.findIndex((x) => x.id === id)

    if (index >= 0) {
      this.positions.splice(index, 1)
    }
  }

  getPositionById(id) {
    return this.positions.find((x) => x.id == id)
  }

  registerGetPlayersEvent() {
    this.client.on('getPlayers', () => {
      this.socket.emit('positions', this.positions)
    })

    return this
  }
}
