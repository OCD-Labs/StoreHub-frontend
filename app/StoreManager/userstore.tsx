'use client'
import { create } from 'zustand'

import { signIn } from '@app/api/getUser'

const user = signIn()

interface userState {
  user: User | undefined
}

export const User = create<userState>((set) => ({
  user: user?.user,
}))
