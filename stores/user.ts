import { ChessComUser } from '@/types/user'
import { create } from 'zustand'

interface UserStore extends ChessComUser {
  setUser: (user: ChessComUser) => void
}

export const useUserStore = create<UserStore>((set) => ({
  '@id': '',
  url: '',
  username: '',
  followers: 0,
  country: '',
  last_online: 0,
  joined: 0,
  status: '',
  is_streamer: false,
  verified: false,
  league: '',
  avatar: '',
  player_id: 0,
  setUser: (user) => set({ ...user }),
}))
