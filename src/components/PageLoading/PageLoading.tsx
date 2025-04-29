'use client';

import loading from '../../../public/lottie/loading.json';
import MainBackground from '../Background/MainBackground';
import styles from './PageLoading.module.scss';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
});

const PageLoading = ({ text = '잠시만 기다려주세요.' }: { text?: string }) => {
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.text}>{text}</div>
        <Lottie className={styles.spinner} loop animationData={loading} play></Lottie>
      </div>
      <MainBackground />
    </>
  );
};

export default PageLoading;
