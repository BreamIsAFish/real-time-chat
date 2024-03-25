'use client'

import MessageSection from '@/app/chat/components/MessageSection'
import { ClientToServerEvents, ServerToClientEvents } from '@/app/server/types'
import { useParams } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

const ChatPage = () => {
  const { room_id } = useParams<{ room_id: string }>()
  const [messages, setMessages] = useState<string[]>([])
  const msgRef = useRef<HTMLInputElement>(null)
  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null)

  useEffect(() => {
    // const call = async () => {
    //   await fetch(`/api/socket`)
    // }
    // call()
    // const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    //   `:3001`,
    //   { path: '/api/socket', addTrailingSlash: false }
    // )
    const socket = io(':3001')
    // console.log('joining', room_id)
    socket.emit('join', room_id)

    // socket.on('connect', () => {
    //   console.log('connected')
    // })

    socket.on('message', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    socketRef.current = socket

    return () => {
      socket.emit('leave')
      socket.disconnect()
    }
  }, [room_id])

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault()
    const message = msgRef.current?.value
    if (!message) return
    console.log(socketRef.current)
    socketRef.current?.emit('sendMessage', message, room_id)
    // setMessages((prevMessages) => [...prevMessages, message])
    msgRef.current.value = ''
  }

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSendMessage}>
        <input
          ref={msgRef}
          className="text-black"
        />
      </form>
      <MessageSection />
      {messages.map((message, index) => (
        <div
          className="text-green-200"
          key={index}
        >
          {message}
        </div>
      ))}
    </div>
  )
}

export default ChatPage
