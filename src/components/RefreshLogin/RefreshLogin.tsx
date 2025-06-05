'use client';

import { signIn } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import useMutateAuth from '@/hooks/mutations/useMutateAuth';

const RefreshLogin = () => {
  const { postLoginAndRefreshMutation } = useMutateAuth();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return; // 중복 방지
    calledRef.current = true;

    postLoginAndRefreshMutation.mutate(undefined, {
      onSuccess: async (data) => {
        await signIn('credentials', {
          accessToken: data.accessToken,
          redirect: false,
        });
      },
    });
  }, []);

  return null;
};

export default RefreshLogin;
