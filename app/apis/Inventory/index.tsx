'use client'
import { BASE_URL } from '@components/util/config'
import { GET_OPTIONS, OPTIONS, POST_OPTION } from '..'

import { storehubAPI } from '@app/(dashboard)/inventory/page'

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

export const GetSalesHistory = (id: string | null): Promise<any> => {
  const res = storehubAPI.get(`/inventory/stores/${id}/sales`)
  return res
}

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

export const AddStoreCoOwner = (
  store_id: string | null,
  data: CoOwner,
): Promise<any> => {
  debugger
  const body = { ...data, new_access_level: Number(data.new_access_level) }
  const res = storehubAPI.post(
    `/inventory/stores/${store_id}/send-access-invitation`,
    body,
  )
  return res
}
