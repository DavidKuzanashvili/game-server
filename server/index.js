const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const routes = require('./routes/index')
const GameBuilder = require('./game/GameBuilder')

const port = process.env.PORT || 4001

const app = express()
app.use(routes)

const server = http.createServer(app)

const io = socketIo(server)

const positions = []

io.on('connection', (socket) => {
  console.log(`New client connected - id: ${socket.id}`)

  const builder = new GameBuilder(positions, socket)
  builder.addPosition(socket.id).emitPosition().actOnEvent()
  console.log(builder.positions)

  socket.on('disconnect', () => {
    console.log(`Client disconnected - id: ${socket.id}`)
    builder.removePosition(socket.id)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
