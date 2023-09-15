'use client'
import { SessionProvider } from 'next-auth/react'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // this acts as a session wrapper for sections of our app we want to use session
  return <SessionProvider>{children}</SessionProvider>
}
