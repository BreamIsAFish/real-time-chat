export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
  message: (message: string) => void
}

export interface ClientToServerEvents {
  join: (roomId: string) => void
  leave: () => void
  sendMessage: (message: string, roomId: string) => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
}

// module.exports = {
//   ServerToClientEvents,
//   ClientToServerEvents,
//   InterServerEvents,
//   SocketData,
// }
