'use client'

import { useGlobalContext } from '@app/Context/store'

export function Providers({ children }) {
  return <useGlobalContext>{children}</useGlobalContext>
}
