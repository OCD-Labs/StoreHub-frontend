export function setSession(session: Session) {
  sessionStorage.setItem('accessData', JSON.stringify(session))
}

export function getSession(): Session | undefined {
  const storedAccessData = sessionStorage.getItem('accessData')
  if (storedAccessData) {
    debugger
    const parsedAccessData = JSON.parse(storedAccessData)
    return parsedAccessData as Session
  }
}

export function setStoreID(store_id: string) {
  sessionStorage.setItem('store_id', store_id)
}

export function getStoreID(): string | undefined {
  const storedAccessData = sessionStorage.getItem('store_id')
  if (storedAccessData) {
    const parsedStoreId = JSON.parse(storedAccessData)
    return parsedStoreId as string
  }
}
export function setItemID(store_id: string) {
  sessionStorage.setItem('item_id', store_id)
}

export function getItemID(): string | undefined {
  const storedAccessData = sessionStorage.getItem('item_id')
  if (storedAccessData) {
    const parsedStoreId = JSON.parse(storedAccessData)
    return parsedStoreId as string
  }
}
