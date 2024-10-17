'use client'
import { ISalesHistory } from '@components/stores/sales/SalesHistoryTable'
import { create } from 'zustand'

export interface ModalOptions {
  url: string
  title: string
}

interface State {
  isOpen: boolean
  isSaleInfoOpen: boolean
  saleInfo: ISalesHistory
  modalOptions: ModalOptions
  isItemDeleted: boolean
  toggleModal: (options: ModalOptions) => void
  setDeleteStatus: () => void
  setSaleInfoStatus: () => void
  setSaleInfo: (sale: ISalesHistory) => void
}

export const modalstore = create<State>((set) => ({
  isOpen: false,
  isSaleInfoOpen: false,
  saleInfo: {
    created_at: '',
    customer_account_id: '',
    customer_id: 0,
    delivery_date: '',
    item_cover_img_url: '',
    item_id: 0,
    item_name: '',
    item_price: '',
    order_date: '',
    order_id: 0,
    sale_id: 0,
    store_id: 0,
  },
  modalOptions: {
    url: '',
    title: '',
  },
  isItemDeleted: false,
  toggleModal: (options: ModalOptions) =>
    set((state) => ({ isOpen: !state.isOpen, modalOptions: options })),
  setDeleteStatus: () => set((state) => ({ isItemDeleted: true })),
  setSaleInfoStatus: () =>
    set((state) => ({ isSaleInfoOpen: !state.isSaleInfoOpen })),
  setSaleInfo: (sale) => set((state) => ({ saleInfo: sale })),
}))
