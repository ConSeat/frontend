'use client';

import styles from './page.module.scss';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useMutateAuth from '@/hooks/mutations/useMutateAuth';
import Icon from '@/components/Icon/Icon';

const SplashPage = () => {
  const router = useRouter();
  const { postLoginAndRefreshMutation } = useMutateAuth();

  useEffect(() => {
    postLoginAndRefreshMutation.mutate(undefined, {
      onSuccess: async (data) => {
        await signIn('credentials', {
          accessToken: data.accessToken,
          callbackUrl: '/home',
          redirect: false,
        });
      },
    });
  }, []);

  useEffect(() => {
    router.prefetch('/home');

    const timeout = setTimeout(() => {
      router.replace('/home');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return <Icon icon="MainLogo" className={styles.mainLogo} />;
};

export default SplashPage;
