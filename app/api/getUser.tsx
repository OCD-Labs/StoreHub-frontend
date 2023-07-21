import { userWallet } from '@app/StoreManager'

import { BASE_URL } from '@components/util/config'
const { wallet } = userWallet.getState()

let user: UserData

export const signIn = () => {
  try {
    if (wallet.accountId) {
      fetch(BASE_URL + '/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account_id: wallet.accountId }),
      })
        .then((response) => response.json())
        .then(({ data }: UserResponse) => {
          user = {
            access_token: data.result.access_token,
            user: data.result.user,
          }
        })
    }
  } catch (error) {
    console.log(error)
  }
  return user
}
