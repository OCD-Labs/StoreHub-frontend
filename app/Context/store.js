'use client'

// NEAR
import { Wallet } from '../NearAuth/near-wallet.js'

const CONTRACT_ADDRESS = 'desperado.testnet'

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS })

// const root = createRoot(container);// createRoot(container!) if you use TypeScript

// Setup on page load

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react'



// interface ContextProps {
//     userId: string,
//     setUserId: Dispatch<SetStateAction<string>>,
//     data: DataType[],
//     setData: Dispatch<SetStateAction<DataType[]>>
// }

const GlobalContext = createContext({
  wallet,
  CONTRACT_ADDRESS,
})

export const GlobalContextProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={{ wallet, CONTRACT_ADDRESS }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
