export function setSession(session: Session) {
    sessionStorage.setItem("accessData", JSON.stringify(session));
  }
  
  export function getSession(): Session | undefined {
    const storedAccessData = sessionStorage.getItem("accessData");
    if (storedAccessData) {
      const parsedAccessData = JSON.parse(storedAccessData);
      return parsedAccessData as Session
    }
  }
  