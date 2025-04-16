'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MainView from '@/components/MainView/MainView';
import { postLogin } from '@/apis/auth.api';

const OAuthCallbackPage = () => {
  const router = useRouter();

  const tryLogin = async () => {
    try {
      const { accessToken } = await postLogin();
      document.cookie = `accessToken=${accessToken}; path=/`;
      router.replace('/home'); // TODO: home 말고 이전 화면으로 돌아가게 해야함
    } catch {
      alert('자동 로그인에 실패했어요.');
      router.replace('/signin');
    }
  };

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <div>
      <MainView />
      <p>로그인 처리 중...</p>
    </div>
  );
};

export default OAuthCallbackPage;
