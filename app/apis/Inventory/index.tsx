import { BASE_URL } from '@components/util/config'
import { GET_OPTIONS, POST_OPTION } from '..'


export const GetStoreItems = (
  userID: string | null,
  id: string | null,
): Promise<any> => {
  const res = fetch(
    BASE_URL + `/users/${userID}/stores/${id}/items`,
    GET_OPTIONS,
  ).then((response) => response.json())
  return res
}

export const EditStoreItem = (
  userID: string | null,
  id: string | null,
): Promise<any> => {
  const res = fetch(
    BASE_URL + `/users/${userID}/stores/${id}/items`,
    GET_OPTIONS,
  ).then((response) => response.json())
  return res
}
