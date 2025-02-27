'use client';

import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { LargeC, LargeO, LargeT, MainLogo } from '@/assets';

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
      <MainLogo className={styles.mainLogo} width={204} height={47} />
      <LargeC className={styles.svgC} width={293} height={472} />
      <LargeO className={styles.svgO} width={201} height={320} />
      <LargeT className={styles.svgT} width={200} height={320} />
    </div>
  );
};

export default SplashPage;
