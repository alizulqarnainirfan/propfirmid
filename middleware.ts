import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle locale routing
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/id', request.url))
  }

  // Admin route protection - check for admin routes
  if (pathname.includes('/admin/')) {
    // For now, we'll let client-side handle auth since we're using localStorage
    // In production, you should implement proper server-side session management
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}