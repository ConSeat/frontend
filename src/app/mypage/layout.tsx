import styles from './MyPage.module.scss';
import type { ReactNode } from 'react';
import Icon from '@/components/Icon/Icon';

interface MyPageLayoutProps {
  children: ReactNode;
}

const layout = ({ children }: MyPageLayoutProps) => {
  return (
    <div className={styles.layout}>
      {children}
      <Icon icon="LargeO" className={styles.alphaIcon} />
    </div>
  );
};

export default layout;
