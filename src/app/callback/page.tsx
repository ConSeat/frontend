'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useMutateAuth from '@/hooks/mutations/useMutateAuth';
import PageLoading from '@/components/PageLoading';

const OAuthCallbackPage = () => {
  const router = useRouter();
  const { postLoginMutation } = useMutateAuth();

  useEffect(() => {
    postLoginMutation.mutate(undefined, {
      onSuccess: () => {
        const returnUrl = sessionStorage.getItem('returnUrl') || '/home';
        sessionStorage.removeItem('returnUrl');

        router.replace(returnUrl);
      },
      onError: () => router.replace('/signin'),
    });
  }, []);

  return (
    <div style={{ height: '100dvh' }}>
      <PageLoading text="로그인 중..." />
    </div>
  );
};

export default OAuthCallbackPage;
