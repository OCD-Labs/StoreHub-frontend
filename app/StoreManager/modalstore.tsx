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
  saleInfo: object
  modalOptions: ModalOptions
  isItemDeleted: boolean
  toggleModal: (options: ModalOptions) => void
  setDeleteStatus: () => void
  setSaleInfoStatus: () => void
  setSaleInfo: (sale:object) => void
}

export const modalstore = create<State>((set) => ({
  isOpen: false,
  isSaleInfoOpen: false,
  saleInfo: {},
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
  setSaleInfo: (sale) =>
    set((state) => ({ saleInfo: sale })),
}))
