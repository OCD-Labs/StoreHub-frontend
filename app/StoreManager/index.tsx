'use client'
import { create } from 'zustand'

import { CONTRACT_ADDRESS } from '@components/util/config'
import { Wallet } from '../NearAuth/near-wallet.js'

const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS })

interface State {
  wallet: Wallet
}

export const userWallet = create<State>((set) => ({
  wallet,
}))
