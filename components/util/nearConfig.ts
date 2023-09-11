import * as nearAPI from 'near-api-js'
const NETWORKID = process.env.NEXT_APP_NETWORKID

export default function getConfig() {
  const config = {
    networkId: NETWORKID,
    explorerUrl: `https://explorer.${
      NETWORKID === 'mainnet' ? '' : NETWORKID + '.'
    }near.org`,
    nodeUrl: `https://rpc.${NETWORKID}.near.org`,
    rpcUrl: `https://archival-rpc.${NETWORKID}.near.org`,
    walletUrl: `https://wallet.${
      NETWORKID === 'mainnet' ? '' : NETWORKID + '.'
    }near.org`,
    helperUrl: `https://helper.${NETWORKID}.near.org`,
  }
  return config
}
