import styles from './page.module.scss';
import type { ReactNode } from 'react';
import Spacing from '@/components/Spacing/Spacing';
import Splitter from '@/components/Splitter/Splitter';

interface ReviewLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const ReviewLayout = ({ children, modal }: ReviewLayoutProps) => {
  return (
    <>
      <Splitter color="sub-gray8" />
      <Spacing size={32} />
      <main className={styles.reviewLayout}>{children}</main>
      {modal}
    </>
  );
};

export default ReviewLayout;
