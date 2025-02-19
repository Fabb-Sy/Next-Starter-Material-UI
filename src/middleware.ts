import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public auth routes that don't need token
const publicAuthRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/api/generate-sw-env',
  '/api/store-session',
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('auth-iron')?.value;

  // Allow access to public auth routes without token
  if (publicAuthRoutes.includes(path)) {
    // If user already has token, redirect to dashboard
    if (token && path === '/auth/login') {
      return NextResponse.redirect(new URL('/backoffice/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // For protected routes, check token
  if (!token && path.startsWith('/backoffice')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Add security headers
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response;
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    '/api/:path*',
    '/backoffice/:path*',
    '/auth/:path*',
  ]
}