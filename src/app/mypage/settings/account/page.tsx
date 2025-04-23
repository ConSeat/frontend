'use client';

import EditSection from '../_components/EditSection';
import styles from './account.module.scss';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon/Icon';

// TODO: page는 ssr로 바꿔야함
const Page = () => {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <Header
        title="프로필 설정"
        right={<Icon icon="Close" size={24} onClick={() => router.back()} />}
      />
      <EditSection nickname={'부화주콘'} profileImage={'/images/kspo-dome.jpg'} />
    </div>
  );
};

export default Page;
