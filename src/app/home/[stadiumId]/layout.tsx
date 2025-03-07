import styles from './page.module.scss';
import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import { ALL_STADIUM_INFO, STADIUM_INFO } from '@/constants/stadium';

interface StadiumId {
  stadiumId: number;
}

interface StadiumLayoutProps {
  children: ReactNode;
  params: Promise<StadiumId>;
}

export async function generateStaticParams() {
  return ALL_STADIUM_INFO.map(({ stadiumId }) => ({
    stadiumId: String(stadiumId),
  }));
}

export const dynamicParams = false;

const StadiumLayout = async ({ children, params }: StadiumLayoutProps) => {
  const stadiumId = Number((await params).stadiumId);

  const isActive = STADIUM_INFO.active.some((stadium) => stadium.stadiumId === stadiumId);

  if (!isActive) {
    return (
      <div className={styles.stadiumLayout}>
        <h2>이 페이지는 아직 열리지 않았습니다.</h2>
        <p>현재는 접근할 수 없습니다. 나중에 다시 확인해 주세요.</p>
      </div>
    );
  }

  return (
    <div className={styles.stadiumLayout}>
      <Header stadiumId={stadiumId} />
      <main className={styles.stadiumMain}>{children}</main>
    </div>
  );
};

export default StadiumLayout;
