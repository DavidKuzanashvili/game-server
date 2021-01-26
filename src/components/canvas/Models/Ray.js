class Ray {
  constructor(pos, angle, p5, Vector) {
    this.p5 = p5
    this.pos = pos
    this.Vector = Vector
    this.dir = this.Vector.fromAngle(angle)
  }

  draw() {
    this.p5.stroke(255)
    this.p5.push()
    this.p5.translate(this.pos.x, this.pos.y)
    this.p5.line(0, 0, this.dir.x * 10, this.dir.y * 10)
    this.p5.pop()
  }

  setAngle(angle) {
    this.dir = this.Vector.fromAngle(angle)
  }

  setDir(x, y) {
    this.dir.x = x - this.pos.x
    this.dir.y = y - this.pos.y
    this.dir.normalize()
  }

  cast(walls) {
    let closest = null
    let record = Infinity
    walls.forEach((wall) => {
      const x1 = wall.a.x
      const y1 = wall.a.y
      const x2 = wall.b.x
      const y2 = wall.b.y

      const x3 = this.pos.x
      const y3 = this.pos.y
      const x4 = this.pos.x + this.dir.x
      const y4 = this.pos.y + this.dir.y

      const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

      if (den === 0) {
        return
      }

      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
      const u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / den

      if (t > 0 && t < 1 && u > 0) {
        const pt = this.p5.createVector()
        pt.x = x1 + t * (x2 - x1)
        pt.y = y1 + t * (y2 - y1)

        const d = this.Vector.dist(this.pos, pt)
        if (d < record) {
          record = d
          closest = pt
        }
      } else {
        return
      }
    })

    if (closest) {
      this.p5.line(this.pos.x, this.pos.y, closest.x, closest.y)
    }

    return record
  }
}

export default Ray
