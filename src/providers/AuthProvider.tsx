'use client';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
  session?: Session | null;
}

export const AuthProvider = ({ children, session }: AuthProviderProps) => {
  return (
    <SessionProvider session={session} basePath="/auth" refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
};
