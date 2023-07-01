import { useGlobalContext } from '../Context/store'
const { wallet } = useGlobalContext()

window.onload = async () => {
  await wallet.startUp()
}
export const useWallet = () => {
  return wallet
}

export const Wallet = wallet
