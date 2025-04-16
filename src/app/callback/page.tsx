'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useMutateAuth from '@/hooks/mutations/useMutateAuth';
import MainView from '@/components/MainView/MainView';

const OAuthCallbackPage = () => {
  const router = useRouter();
  const { postLoginMutation } = useMutateAuth();

  useEffect(() => {
    postLoginMutation.mutate(undefined, {
      onSuccess: () => router.replace('/home'), // TODO: home 말고 이전 화면으로 돌아가게 해야함
      onError: () => router.replace('/signin'),
    });
  }, []);

  return (
    <div>
      <MainView />
      <p>로그인 처리 중...</p>
    </div>
  );
};

export default OAuthCallbackPage;
