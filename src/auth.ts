import { PUBLIC_ENV } from './config/env';
import { jwtDecode } from 'jwt-decode';
import NextAuth from 'next-auth';
import type { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

/**
 * NextAuth v5 설정
 * - auth:  서버·컴포넌트 어디서나 세션 읽기
 * - handlers: API Route(GET/POST)용 핸들러
 * - signIn / signOut: Client 컴포넌트용 액션
 */
export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },

  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        accessToken: { label: 'Access Token', type: 'text' },
      },
      authorize: async (credentials) => {
        if (!credentials.accessToken || typeof credentials.accessToken !== 'string') {
          throw new Error('Invalid access token');
        }
        return {
          id: credentials.accessToken,
          accessToken: credentials.accessToken,
        } as User;
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        const { exp } = jwtDecode<{ exp: number }>(user.accessToken);
        token.accessTokenExpires = exp * 1000;
      }

      if (Date.now() < (token.accessTokenExpires ?? 0)) {
        return token;
      }

      return {};
    },

    session: ({ session, token }) => {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  secret: PUBLIC_ENV.nextAuthSecret,
} as NextAuthConfig);
