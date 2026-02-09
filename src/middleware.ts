import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const COOKIE_NAME = 'site-auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip password check for the login page, login API, and static assets
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/login') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get(COOKIE_NAME);
  if (authCookie?.value === 'authenticated') {
    return intlMiddleware(request);
  }

  // Redirect to login
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/', '/(de|en|fr)/:path*', '/login', '/api/login'],
};
