'use client'
import { create } from 'zustand'

export interface ModalOptions {
  url: string
  title: string
}

interface State {
  isOpen: boolean
  modalOptions: ModalOptions
  isItemDeleted: boolean
  toggleModal: (options: ModalOptions) => void
  setDeleteStatus: () => void
}

export const modalstore = create<State>((set) => ({
  isOpen: false,
  modalOptions: {
    url: '',
    title: '',
  },
  isItemDeleted: false,
  toggleModal: (options: ModalOptions) =>
    set((state) => ({ isOpen: !state.isOpen, modalOptions: options })),
  setDeleteStatus: () => set((state) => ({ isItemDeleted: true })),
}))
