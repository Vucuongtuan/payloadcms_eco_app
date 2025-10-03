import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest): NextResponse {
  // First, let next-intl handle the routing
  const response = intlMiddleware(request);

  const country = request.geo?.country || 'US';

  response.headers.set('x-country', country);
  return response;
}

// Config remains the same
export const config = {
  matcher: [
    '/((?!api|_next|_vercel|admin|next|.*\\..*).*)',
  ],
};
