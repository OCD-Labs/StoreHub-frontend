const NETWORKID = process.env.NEXT_APP_NETWORKID
const CONTRACT_NAME = process.env.NEXT_APP_CONTRACTNAME

export default function getConfig() {
  const config = {
    NETWORKID: NETWORKID,
    explorerUrl: `https://explorer.${
      NETWORKID === 'mainnet' ? '' : NETWORKID + '.'
    }near.org`,
    nodeUrl: `https://rpc.${NETWORKID}.near.org`,
    rpcUrl: `https://archival-rpc.${NETWORKID}.near.org`,
    contractName: CONTRACT_NAME,
    walletUrl: `https://wallet.${
      NETWORKID === 'mainnet' ? '' : NETWORKID + '.'
    }near.org`,
    helperUrl: `https://helper.${NETWORKID}.near.org`,
  }
  return config
}
