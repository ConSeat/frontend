import styles from './page.module.scss';
import Header from '@/components/Header/Header';

interface HallLayoutProps {
  children: React.ReactNode;
  params: { hall: string };
}

const HallLayout = ({ children, params }: HallLayoutProps) => {
  return (
    <div className={styles.hallLayout}>
      <Header hall={params.hall} />
      <main className={styles.hallMain}>{children}</main>
    </div>
  );
};

export default HallLayout;
