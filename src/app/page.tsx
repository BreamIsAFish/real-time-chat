'use client'

import { redirect, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputRef.current?.value) return
    console.log('submit', inputRef.current?.value)
    // redirect(`/chat/${inputRef.current.value}`)
    router.push(`/chat/${inputRef.current.value}`)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-red-400 "
    >
      <input
        ref={inputRef}
        className="text-black"
        onSubmit={onSubmit}
      />
    </form>
  )
}
