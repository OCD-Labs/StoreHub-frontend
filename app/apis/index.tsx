import { userWallet } from '@app/StoreManager'

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

export const deleteStoreItem = async (
  option: OPTIONS,
  userID: string | null,
  storeId: string | null,
  itemId: number,
) => {
  try {
    debugger
    const res = await fetch(
      `${BASE_URL}/inventory/stores/${storeId}/items/${itemId}`,
      option,
    )
    const result = await res.json()
    return result
    debugger
  } catch (error) {
    if (error) throw new Error(error + '')
  }
}
