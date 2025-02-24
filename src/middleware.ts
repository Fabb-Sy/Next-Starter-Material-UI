import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookiesIronSession } from './lib/decodeIronSession';

// Define public auth routes that don't need token
const publicAuthRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/api/generate-sw-env',
  '/api/store-session',
  '/api/auth/save-google-data',
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authIronToken  = request.cookies.get('auth-iron')?.value;
  const nextAuthSessionToken = request.cookies.get("next-auth.session-token")?.value;
  const nextAuthGoogleToken = request.cookies.get('auth-iron-google')?.value;

  // console.log('Cookies: ', request.cookies)

  const isLoggedIn = !!authIronToken || !!nextAuthSessionToken;

  // Allow access to public auth routes without token
  if (publicAuthRoutes.includes(path)) {
    // If user already has token, redirect to dashboard
    if (isLoggedIn && path === '/auth/login') {
      return NextResponse.redirect(new URL('/backoffice/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // For protected routes, check token
  if (!isLoggedIn && path.startsWith('/backoffice')) {
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