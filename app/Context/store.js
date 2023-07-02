'use client'

import { CONTRACT_ADDRESS } from '@components/util/config';
import { Wallet } from '../NearAuth/near-wallet.js';
import { createContext, useContext } from 'react'

const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS })

const GlobalContext = createContext({
  wallet,
})

export const GlobalContextProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={{ wallet, CONTRACT_ADDRESS }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
