import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import { ALL_HALL_IDS } from '@/constants/hallName';

interface HallLayoutProps {
  children: React.ReactNode;
  params: { hall: string };
}

export async function generateStaticParams() {
  return ALL_HALL_IDS.map((id) => ({ hall: id }));
}

export const dynamicParams = false;

const HallLayout = ({ children, params }: HallLayoutProps) => {
  return (
    <div className={styles.hallLayout}>
      <Header hall={params.hall} />
      <main className={styles.hallMain}>{children}</main>
    </div>
  );
};

export default HallLayout;
