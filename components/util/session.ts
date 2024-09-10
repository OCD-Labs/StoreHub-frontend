export function setSession(session: Session) {
  sessionStorage.setItem("accessData", JSON.stringify(session));
}

export function getSession(): Session | undefined {
  const storedAccessData = sessionStorage.getItem("accessData");
  if (storedAccessData) {
    const parsedAccessData = JSON.parse(storedAccessData);
    return parsedAccessData as Session;
  }
}

export function setStoreID(store_id: string) {
  sessionStorage.setItem("store_id", store_id);
}

export function getStoreID(): string | undefined {
  const storedAccessData = sessionStorage.getItem("store_id");
  if (storedAccessData) {
    const parsedStoreId = JSON.parse(storedAccessData);
    return parsedStoreId as string;
  }
}
export function setItemID(store_id: string) {
  sessionStorage.setItem("item_id", store_id);
}

export function getItemID(): string | undefined {
  const storedAccessData = sessionStorage.getItem("item_id");
  if (storedAccessData) {
    const parsedStoreId = JSON.parse(storedAccessData);
    return parsedStoreId as string;
  }
}

export function setUser(name: string, data: string) {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    if (!name) return null;
    localStorage.setItem(name, data);
  }
  return null;
}

export function getUser(name: string) {
  if (!name) return null;
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    const user = localStorage.getItem(name);
    if (user) {
      return JSON.parse(user);
    }
  }
  return null;
}

export function removeUser(name: string) {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    if (!name) return null;

    localStorage.removeItem(name);
  }
  return null;
}
