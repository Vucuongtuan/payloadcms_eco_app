import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest): NextResponse {
  // First, let next-intl handle the routing
  const response = intlMiddleware(request);

  // Get country from Vercel's geo headers. Default to 'US' if not found.
  const country = request.geo?.country || 'US';

  // Add the country code to the response headers
  // This makes it available in Server Components via `headers()`
  response.headers.set('x-country', country);
   console.log({country,response,request})
  return response;
}

// Config remains the same
export const config = {
  matcher: [
    '/((?!api|_next|_vercel|admin|next|.*\\..*).*)',
  ],
};
