'use client'

debugger

interface IUsesProfile {
  setSession: (session: Session) => void
  getSession: () => Session | undefined
}

const useProfile = (): IUsesProfile => {
  function setSession(session: Session) {
    sessionStorage.setItem('accessData', JSON.stringify(session))
  }

  function getSession(): Session | undefined {
    const storedAccessData =
      typeof window !== 'undefined'
        ? window.sessionStorage.getItem('accessData')
        : false
    if (storedAccessData) {
      const parsedAccessData = JSON.parse(storedAccessData)
      return parsedAccessData as Session
    }
  }

  return {
    setSession: setSession,
    getSession: getSession,
  }
}

export default useProfile
