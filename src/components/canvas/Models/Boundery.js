class Boundery {
  constructor(x1, y1, x2, y2, p5) {
    this.a = p5.createVector(x1, y1)
    this.b = p5.createVector(x2, y2)
    this.p5 = p5
  }

  draw() {
    this.p5.stroke(255)
    this.p5.line(this.a.x, this.a.y, this.b.x, this.b.y)
  }
}

export default Boundery
