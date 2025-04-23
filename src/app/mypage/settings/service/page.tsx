'use client';

import InfoSection from '../_components/InfoSection';
import styles from './service.module.scss';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon/Icon';

// TODO: page는 ssr로 바꿔야함
const Page = () => {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <Header
        title="앱 설정"
        right={<Icon icon="Close" size={24} onClick={() => router.back()} />}
      />
      <InfoSection />
    </div>
  );
};

export default Page;
