module.exports = class GameBuilder {
  constructor(positions, socket) {
    this.positions = positions || []
    this.socket = socket
  }

  emitPosition() {
    this.socket.emit('positions', this.positions)

    return this
  }

  actOnEvent() {
    const position = this.getPositionById(this.socket.id)
    if (!position) return
    this.socket.on('move', (data) => {
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
    const position = this.getPositionById(id)
    if (!position) {
      this.positions.push({
        id: id,
        x: 0,
        y: 0,
      })
    }

    return this
  }

  removePosition(id) {
    const position = this.getPositionById(id)
    if (position) {
      const index = this.positions.findIndex(position.id)
      this.positions.splice(index, 1)
    }
  }

  getPositionById(id) {
    return this.positions.find((x) => x.id == id)
  }
}
