import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/auth')) {
    if (token) {
      return NextResponse.redirect(new URL('/trends', req.url));
    }
  }

  if (
    pathname.startsWith('/mypage') ||
    pathname.startsWith('/exchange') ||
    pathname.startsWith('/trends')
  ) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }
  }
}

export const config = {
  matcher: ['/mypage/:path*', '/exchange/:path*', '/trends'],
};
