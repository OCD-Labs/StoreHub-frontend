// @ts-nocheck
'use client'

// import * as nearAPI from 'near-api-js'
// import { generateSeedPhrase } from 'near-seed-phrase'

// const { connect, keyStores, WalletConnection } = nearAPI

// const connectionConfig = {
//   networkId: 'testnet',
//   keyStore: new keyStores.BrowserLocalStorageKeyStore(),
//   nodeUrl: 'https://rpc.testnet.near.org',
//   walletUrl: 'https://wallet.testnet.near.org',
//   helperUrl: 'https://helper.testnet.near.org',
//   explorerUrl: 'https://explorer.testnet.near.org',
// }

// export const InitContract = async () => {
//   // connect to NEAR
//   const nearConnection = await connect(connectionConfig)

//   // create wallet connection
//   const walletConnection = new WalletConnection(nearConnection)

//   async function createWalletAccount(account_name: string) {
//     const account = await nearConnection.account('storehub-v1.testnet')
//     debugger
//     let { publicKey, secretKey } = generateSeedPhrase()
//     await account.createAccount(
//       `${account_name}.storehub-v1.testnet`, // new account name
//       publicKey, // public key for new account
//       '10000000000000000000', // initial balance for new account in yoctoNEAR
//     )
//   }

//   return { createWalletAccount }
// }

export const BASE_URL: string = 'https://store-hub-djxu.onrender.com/api/v1'
// export const BASE_URL = "http://localhost:6780/api/v1";
export const CONTRACT_ADDRESS: string = 'v2-storehub.testnet'
