import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      console.log('No token found, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const user = await verifyToken(token);
    if (!user) {
      console.log('Invalid token, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    console.log('Token verified for user:', user.email);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
