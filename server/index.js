const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const routes = require('./routes/index')
const GameBuilder = require('./game/GameBuilder')
const initDb = require('./Data')

initDb()

const port = process.env.PORT || 4001

const app = express()
app.use(routes)

const server = http.createServer(app)

const io = socketIo(server)

const positions = []

io.on('connection', (socket) => {
  console.log(`New client connected - id: ${socket.id}`)
  socket.emit('userConnected', socket.id)
  const builder = new GameBuilder(positions, socket)
  builder
    .addPosition(socket.id)
    .emitPositions()
    .actOnEvent()
    .registerGetPlayersEvent()

  socket.on('disconnect', () => {
    console.log(`Client disconnected - id: ${socket.id}`)
    builder.removePosition(socket.id)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
