'use client'
import { create } from 'zustand'

export interface ModalOptions {
  url: string
  title: string
}

interface State {
  isOpen: boolean
  modalOptions: ModalOptions

  toggleModal: (options: ModalOptions) => void
}

export const modalstore = create<State>((set) => ({
  isOpen: false,
  modalOptions: {
    url: '',
    title: '',
  },
  toggleModal: (options: ModalOptions) =>
    set((state) => ({ isOpen: !state.isOpen, modalOptions: options })),
}))
