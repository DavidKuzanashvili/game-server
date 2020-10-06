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

const builder = new GameBuilder(positions, io)

io.on('connection', (client) => {
  console.log(`New client connected - id: ${client.id}`)
  builder
    .setClient(client)
    .addPosition(client.id)
    .emitPositions()
    .actOnEvent(client.id)

  client.on('disconnect', () => {
    console.log(`Client disconnected - id: ${client.id}`)
    builder.removePosition(client.id)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
