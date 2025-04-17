import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkAuth } from '../utils/auth';

export async function middleware(req: NextRequest) {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/bookings/:path*'],
};
