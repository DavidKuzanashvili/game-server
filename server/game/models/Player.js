module.exports = class Palyer {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  move = (motion) => {
    switch (motion) {
      case 'left':
        this.x -= 5
        break
      case 'right':
        this.x += 5
        break
      case 'up':
        this.y -= 5
        break
      case 'down':
        this.y += 5
        break
    }
  }

  update(players) {
    players.array.forEach((element) => {
      if (element.x + 50 >= this.x && element.y + 50 >= this.y) {
        return
      }
    })
  }
}
