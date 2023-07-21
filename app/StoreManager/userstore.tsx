'use client'
import { create } from 'zustand'

import { signIn } from '@app/apis/getUser'

const user = signIn()

interface userState {
  user: User | undefined
}

export const User = create<userState>((set) => ({
  user: user?.user,
}))
