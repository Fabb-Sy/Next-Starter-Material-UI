import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path === '/api/generate-sw-env') {
    return NextResponse.next();
  }
  // Get the token from cookies
  const token = request.cookies.get('token')?.value || ''

  // Redirect logic for authentication
  if (token) {
    return NextResponse.redirect(new URL('/backoffice/dashboard', request.url))
  }

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Add security headers
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    '/api/:path*',
    '/backoffice/:path*',
    '/auth/:path*',
  ]
}
