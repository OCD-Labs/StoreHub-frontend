'use client'
import { Store } from 'lucide-react'
import { create } from 'zustand'

export interface StoreOwner {
  access_levels: number[]
  account_id: string
  added_at: string
  email: string
  is_original_owner: true
  profile_img_url: string
}
export type StoreOwners = StoreOwner[]

export interface Store {
  category: string
  is_frozen: false
  is_verified: false
  store_account_id: string
  store_created_at: string
  store_description: string
  store_id: number
  store_image: string
  store_name: string
  store_owners: StoreOwners
}
export type Stores = Store[]

interface State {
  stores: Stores
  store: Store
  setStores: (stores: Stores) => void
}

export const Inventory = create<State>((set) => ({
  stores: [],
  store: {
    category: '',
    is_frozen: false,
    is_verified: false,
    store_account_id: '',
    store_created_at: '',
    store_description: '',
    store_id: 0,
    store_image: '',
    store_name: '',
    store_owners: [],
  },
  setStores: (stores: Stores) => set(() => ({ stores: stores })),
}))
