import { auth } from './auth';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SIGNIN_PATH = '/signin';

function redirectToSignin(req: NextRequest) {
  return NextResponse.redirect(new URL(SIGNIN_PATH, req.url));
}

function isExpired(token: { accessTokenExpires?: number }) {
  return typeof token.accessTokenExpires === 'number' && Date.now() >= token.accessTokenExpires;
}

export default auth(async (request: NextRequest) => {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  console.log('middleware', token, token?.accessToken);

  if (!token || !token.accessToken || isExpired(token)) {
    return redirectToSignin(request);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/mypage', '/mypage/:path*'],
};
