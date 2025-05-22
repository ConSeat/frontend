import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const SIGNIN_PATH = '/signin';

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL(SIGNIN_PATH, req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/mypage/:path*', '/home/:stadiumId/review/:path*', '/settings/:path*'],
};
