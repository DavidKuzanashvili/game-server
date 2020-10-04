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
}
