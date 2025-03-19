'use client';

import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Icon from '@/components/Icon/Icon';
import MainView from '@/components/MainView/MainView';

const SplashPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/home');
    const timeout = setTimeout(() => {
      router.replace('/home');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <MainView />
      <Icon icon="MainLogo" className={styles.mainLogo} />
    </>
  );
};

export default SplashPage;
