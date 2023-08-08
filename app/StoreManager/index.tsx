'use client'
import { create } from 'zustand'

import { CONTRACT_ADDRESS } from '@components/util/config'
import { Wallet } from '../NearAuth/near-wallet.js'

const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS })

interface State {
  wallet: Wallet
  user: UserData | null
  setUser: (user: UserData) => void
}

export const userWallet = create<State>((set) => ({
  wallet,
  user: null,
  setUser: (user) => set(() => ({ user: user })),
}))
