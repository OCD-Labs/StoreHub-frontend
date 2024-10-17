"use client";

// Set Cookie
export function setCookie(name: string, value: string, days: number) {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }
  return null;
}

// Get Cookie
export function getCookie(name: string): string | null {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }
  return null;
}

// Delete Cookie
export function clearCookie(name: string) {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  return null;
}
