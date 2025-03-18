'use client';

import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Icon from '@/components/Icon/Icon';

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
    <div className={styles.splashLayout}>
      <Icon icon="MainLogo" size={204} className={styles.mainLogo} />
      <Icon icon="LargeC" size={200} className={styles.svgC} />
      <Icon icon="LargeO" size={200} className={styles.svgO} />
      <Icon icon="LargeT" size={200} className={styles.svgT} />
    </div>
  );
};

export default SplashPage;
