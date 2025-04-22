import ClientHeaderWrapper from './_components/ClientHeaderWrapper/ClientHeaderWrapper';
import styles from './page.module.scss';
import { ReactNode } from 'react';
import { PUBLIC_ENV } from '@/config/env';
import type { StadiumInfo } from '@/types/stadium';

interface StadiumId {
  stadiumId: number;
}

interface StadiumLayoutProps {
  children: ReactNode;
  params: StadiumId;
}

export async function generateStaticParams() {
  const res = await fetch(`${PUBLIC_ENV.baseUrl}/stadiums`);

  const data = await res.json();

  const allStadiums = [...(data.active ?? []), ...(data.inactive ?? [])];

  return allStadiums.map((stadium: { stadiumId: number }) => ({
    stadiumId: stadium.stadiumId,
  }));
}

export const dynamicParams = false;

const StadiumLayout = async ({ children, params }: StadiumLayoutProps) => {
  const stadiumId = Number(params.stadiumId);

  const res = await fetch(`${PUBLIC_ENV.baseUrl}/stadiums`);

  if (!res.ok) {
    throw new Error('Failed to fetch stadium data');
  }

  const json = await res.json();
  const activeStadium = json.body?.active?.find((s: StadiumInfo) => s.stadiumId === stadiumId);

  if (!activeStadium) {
    return (
      <div className={styles.stadiumLayout}>
        <h2>이 페이지는 아직 열리지 않았습니다.</h2>
        <p>현재는 접근할 수 없습니다. 나중에 다시 확인해 주세요.</p>
      </div>
    );
  }

  return (
    <div className={styles.stadiumLayout}>
      <ClientHeaderWrapper stadium={activeStadium} />
      {children}
    </div>
  );
};

export default StadiumLayout;
