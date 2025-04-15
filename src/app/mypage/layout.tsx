import styles from './MyPage.module.scss';
import type { ReactNode } from 'react';
import Icon from '@/components/Icon/Icon';

interface MyPageLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const layout = ({ children, modal }: MyPageLayoutProps) => {
  return (
    <div className={styles.layout}>
      {children}
      {modal}
      <Icon icon="LargeO" className={styles.alphaIcon} />
    </div>
  );
};

export default layout;
