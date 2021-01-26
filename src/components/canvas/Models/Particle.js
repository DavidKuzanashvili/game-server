import Ray from './Ray'

class Particle {
  constructor(pos, p5, Vector) {
    this.p5 = p5
    this.pos = this.p5.createVector(pos.x, pos.y)
    this.rays = []
    this.heading = 0
    for (let i = 0; i < 90; i += 1) {
      this.rays[i] = new Ray(this.pos, this.p5.radians(i), this.p5, Vector)
    }

    this.scene = []
  }

  draw(walls) {
    this.p5.ellipse(this.pos.x, this.pos.y, 10, 10)
    this.rays.forEach((ray, index) => {
      ray.draw()
      const sceneEpisode = ray.cast(walls)
      this.scene[index] = sceneEpisode
    })
  }

  update(x, y) {
    this.pos.x = x
    this.pos.y = y
  }

  rotate(angle) {
    this.heading += angle
    for (let i = 0; i < this.rays.length; i++) {
      this.rays[i].setAngle(this.p5.radians(i) + this.heading)
    }
  }

  getScene() {
    return this.scene
  }
}

export default Particle
