import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import { ALL_HALL_IDS } from '@/constants/hallName';

interface Hall {
  hall: string;
}

interface HallLayoutProps {
  children: React.ReactNode;
  params: Promise<Hall>;
}

export async function generateStaticParams() {
  return ALL_HALL_IDS.map((id) => ({ hall: id }));
}

export const dynamicParams = false;

const HallLayout = async ({ children, params }: HallLayoutProps) => {
  const { hall } = await params;

  return (
    <div className={styles.hallLayout}>
      <Header hall={hall} />
      <main className={styles.hallMain}>{children}</main>
    </div>
  );
};

export default HallLayout;
