import styles from './settings.module.scss';
import type { ReactNode } from 'react';
import ThirdBackground from '@/components/Background/ThirdBackground';

interface MyPageLayoutProps {
  children: ReactNode;
}

const layout = ({ children }: MyPageLayoutProps) => {
  return (
    <div className={styles.layout}>
      <ThirdBackground />
      {children}
    </div>
  );
};

export default layout;
