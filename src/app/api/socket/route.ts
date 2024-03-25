// import {
//   ClientToServerEvents,
//   InterServerEvents,
//   ServerToClientEvents,
//   SocketData,
// } from '@/app/server/types'
// // import http from 'http'
// // import { Server } from 'socket.io'

// // const http = require('http')
// // const { Server } = require('socket.io')
// // const SocketSever = () => {
// //   const server = http.createServer()
// //   const io = new Server<
// //     ClientToServerEvents,
// //     ServerToClientEvents,
// //     InterServerEvents,
// //     SocketData
// //   >(server)

// // const userRooms: Record<string, string> = {}

// //   io.on('connection', (socket) => {
// //     console.log('A user connected')

// //     // Handle chat messages
// //     socket.on('join', (roomId) => {
// //       socket.join(roomId.toString())
// //     })

// //     socket.on('sendMessage', (message) => {
// //       const roomId = userRooms[socket.id]
// //       io.to(roomId).emit('message', message)
// //     })

// //     socket.on('disconnect', () => {
// //       console.log('A user disconnected')
// //     })
// //   })

// //   server.listen(3001, () => {
// //     console.log('WebSocket server listening on port 3001')
// //   })
// // }

// // export default SocketSever
// import type { Server as HTTPServer } from 'http'
// import type { Socket as NetSocket } from 'net'
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { NextResponse } from 'next/server'
// import type { Server as IOServer } from 'socket.io'
// import { Server } from 'socket.io'

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// interface SocketServer extends HTTPServer {
//   io?: IOServer | undefined
// }

// interface SocketWithIO extends NetSocket {
//   server: SocketServer
// }

// // interface NextApiResponseWithSocket extends NextApiResponse {
// //   socket: SocketWithIO
// // }

// const PORT = 3000
// const userRooms: Record<string, string> = {}

// export async function GET(
//   _req: NextApiRequest
//   // res: NextApiResponseWithSocket
// ) {
//   // if (res.socket.server.io) {
//   //   res.status(200).json({
//   //     success: true,
//   //     message: 'Socket is already running',
//   //     socket: `:${PORT + 1}`,
//   //   })
//   //   return
//   // }

//   console.log('Starting Socket.IO server on port:', PORT + 1)
//   const io = new Server<
//     ClientToServerEvents,
//     ServerToClientEvents,
//     InterServerEvents,
//     SocketData
//   >({
//     path: '/api/socket',
//     addTrailingSlash: false,
//     cors: { origin: '*' },
//   }).listen(PORT + 1)

//   io.on('connection', (socket) => {
//     const _socket = socket
//     console.log('socket connect', socket.id)
//     _socket.broadcast.emit('message', `Welcome ${_socket.id}`)
//     // Handle chat messages
//     socket.on('join', (roomId) => {
//       socket.join(roomId.toString())
//     })

//     socket.on('sendMessage', (message) => {
//       const roomId = userRooms[socket.id]
//       console.log('sendMessage', message, roomId)
//       io.to(roomId).emit('message', message)
//     })

//     socket.on('disconnect', async () => {
//       console.log('socket disconnect')
//     })
//   })

//   // res.socket.server.io = io
//   // res.status(201).json({
//   //   success: true,
//   //   message: 'Socket is started',
//   //   socket: `:${PORT + 1}`,
//   // })
//   // let res = NextResponse.next()
//   // response.socket.server.io = io
//   return NextResponse.json(
//     {
//       success: true,
//       message: 'Socket is started',
//       socket: `:${PORT + 1}`,
//     },
//     { status: 201 }
//   )

//   // return res
// }
