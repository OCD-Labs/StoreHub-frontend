'use client'
import { create } from 'zustand'

interface State {
    isOpen: boolean
    toggleModal: ()=> void
}

export const modalstore = create<State>((set) => ({
    isOpen: false,
    toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}))
