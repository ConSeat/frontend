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
      onSuccess: () => router.replace('/home'), // TODO: home 말고 이전 화면으로 돌아가게 해야함
      onError: () => router.replace('/signin'),
    });
  }, []);

  return <PageLoading text="로그인 중..." />;
};

export default OAuthCallbackPage;
