'use client';

import { signIn, signOut } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { postLoginAndRefresh } from '@/apis/auth/auth.api';

const RefreshLogin = () => {
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return; // 중복 방지
    calledRef.current = true;

    const run = async () => {
      try {
        const data = await postLoginAndRefresh();
        await signIn('credentials', {
          accessToken: data.accessToken,
          redirect: false,
        });
      } catch {
        localStorage.removeItem('memberInfo');
        await signOut({ redirect: false });
        return;
      }
    };

    run();
  }, []);

  return null;
};

export default RefreshLogin;
