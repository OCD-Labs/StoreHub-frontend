import { userWallet } from '@app/StoreManager'
import { User } from '@app/StoreManager/userstore'
import { BASE_URL } from '@components/util/config'

const { user } = userWallet.getState()

export interface OPTIONS {
  method: string
  headers: {
    'Content-Type': string
    Authorization: string
  }
}

export const GET_OPTIONS: OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.access_token}`,
  },
}

export const POST_OPTION: OPTIONS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.access_token}`,
  },
}

export const fetchAllStores = (
  page: string,
  page_size: string,
): Promise<any> => {
  const res = fetch(
    `${BASE_URL}/stores/?page=${Number(page)}&page_size=${page_size}`,
    GET_OPTIONS,
  ).then((response) => response.json())

  return res
}
