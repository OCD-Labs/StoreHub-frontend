'use client'
import { BASE_URL } from '@components/util/config'
import { GET_OPTIONS, OPTIONS, POST_OPTION } from '..'


import { AxiosResponse } from 'axios'

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

export const GetSalesOverview = (
  userID: string | null,
  id: string | null,
  GET_OPTIONS: OPTIONS,
): Promise<any> => {
  const res = fetch(
    BASE_URL + `/inventory/stores/${id}/sales-overview`,
    GET_OPTIONS,
  ).then((response) => response.json())
  return res
}

// export const GetSalesHistory = (id: string | null): Promise<any> => {
//   const res = storehubAPI.get(`/inventory/stores/${id}/sales`)
//   return res
// }

export const FetchOrdersOverview = (
  store_id: string | null,
  GET_OPTIONS: OPTIONS,
): Promise<any> => {
  const res = fetch(
    BASE_URL + `/inventory/stores/${store_id}/orders`,
    GET_OPTIONS,
  ).then((response) => response.json())
  return res
}

// export const AddStoreCoOwner = (
//   store_id: string | null,
//   data: CoOwner,
// ): Promise<any> => {
//   debugger
//   const body = { ...data, new_access_level: Number(data.new_access_level) }
//   const res = fetch(
//     `/inventory/stores/${store_id}/send-access-invitation`, {
//       method: 'POST',
//       headers: {

//       }
//     }
//     body,
//   )
//   return res
// }

export const GetAllReviews = (
  store_id: string | null,
  GET_OPTIONS: OPTIONS,
): Promise<any> => {
  const res = fetch(
    BASE_URL + `/inventory/stores/${store_id}/reviews`,
    GET_OPTIONS,
  ).then((response) => response.json())
  return res
}
export const acceptInvitaion = (
  store_id: string | null,
  confirmationToken: string | null,
  GET_OPTIONS: OPTIONS,
): Promise<InvitationResponse> => {
  console.log(confirmationToken)
  const res = fetch(
    BASE_URL +
      `/inventory/stores/${store_id}/accept-access-invitation?sth_code=${confirmationToken}`,
    GET_OPTIONS,
  ).then((response) => response.json())
  return res
}

// export const GetStoreDetails = async (
//   store_name: string | null,
// ): Promise<any> => {
//   const res = await storehubAPI.get(`/stores?store_name=${store_name}`)
//   return res.data
// }
