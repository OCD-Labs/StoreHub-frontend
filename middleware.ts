import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@components/util/session'
import axios from 'axios'
import { BASE_URL } from '@components/util/config'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  if (url.pathname === '/') {
    url.pathname = '/home'
    return NextResponse.redirect(url)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('headers', 'uma victor')

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })

  return response
}
