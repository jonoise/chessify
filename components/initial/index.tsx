import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { useUserStore } from '@/stores/user'
// @ts-ignore
import * as ChessWebApi from 'chess-web-api'
import { toast } from 'react-hot-toast'

var chessAPI = new ChessWebApi()

export const InitialSection = () => {
  const initial = useUserStore((s) => s)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (inputRef.current) inputRef.current?.focus()
  }, [])

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await chessAPI.getPlayer(inputRef.current?.value)
      initial.setUser(res.body)
    } catch (error) {
      toast.error('Username not found.')
    }
  }

  return (
    <motion.div
      key={'username'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='w-full h-screen flex flex-col items-center justify-center'
    >
      <div className='flex items-center justify-center space-x-2'>
        <p>Select your</p>
        <Image
          src={'/chesscomlogo.png'}
          width={100}
          height={100}
          alt='Chess.com logo'
          className='mb-1'
        />
        <p>username.</p>
      </div>
      <form onSubmit={onsubmit} className='flex '>
        <input
          ref={inputRef}
          type='text'
          className='rounded px-2 py-1 focus:outline-none'
        />
        <button className='px-4 py-1 border-l bg-zinc-800'>Done</button>
      </form>
    </motion.div>
  )
}
