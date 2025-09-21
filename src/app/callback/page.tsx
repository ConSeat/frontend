'use client';

import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useMutateAuth from '@/hooks/mutations/useMutateAuth';
import PageLoading from '@/components/PageLoading';
import { getMemberInfo } from '@/apis/members/member.api';

const OAuthCallbackPage = () => {
  const router = useRouter();
  const { postLoginAndRefreshMutation } = useMutateAuth();

  useEffect(() => {
    postLoginAndRefreshMutation.mutate(undefined, {
      onSuccess: async (data) => {
        const returnUrl = sessionStorage.getItem('returnUrl') || '/home';

        await signIn('credentials', {
          accessToken: data.accessToken,
          callbackUrl: returnUrl,
          redirect: false,
        });

        try {
          const memberInfo = await getMemberInfo();
          localStorage.setItem('memberInfo', JSON.stringify(memberInfo));
        } catch {
          localStorage.removeItem('memberInfo');
        }

        sessionStorage.removeItem('returnUrl');

        router.replace(returnUrl);
      },
      onError: async () => {
        try {
          await signOut({ redirectTo: '/home' });
        } catch (signOutError) {
          console.warn('SignOut failed, continuing...', signOutError);
          window.location.href = '/signin';
        }
      },
    });
  }, []);

  return (
    <div style={{ height: '100dvh' }}>
      <PageLoading text="로그인 중..." />
    </div>
  );
};

export default OAuthCallbackPage;
