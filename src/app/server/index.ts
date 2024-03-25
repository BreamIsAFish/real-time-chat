import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '@/app/server/types'

// const {
//   ClientToServerEvents,
//   InterServerEvents,
//   ServerToClientEvents,
//   SocketData,
// } = require('./types')
// const http = require('http')
// const { Server } = require('socket.io')
import http from 'http'
import { Server } from 'socket.io'

const server = http.createServer()
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  // path: '/api/socket',
  // addTrailingSlash: false,
  cors: { origin: '*' },
})

const userRooms: Record<string, string> = {}

io.on('connection', (socket) => {
  // console.log('A user connected')

  // Handle chat messages
  socket.on('join', (roomId) => {
    console.log(socket.id, 'join', roomId)
    socket.join(roomId)
    io.to(roomId).emit('message', `Welcome ${socket.id}`)
  })

  socket.on('leave', () => {
    console.log('leave')
    const roomId = userRooms[socket.id]
    delete userRooms[socket.id]
    socket.leave(roomId)
  })

  socket.on('sendMessage', (message, roomId) => {
    // const roomId = userRooms[socket.id]
    // console.log('sendMessage', message, roomId)
    io.to(roomId).emit('message', message)
    // io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001')
})
