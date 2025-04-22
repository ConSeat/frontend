import ClientHeaderWrapper from './_components/ClientHeaderWrapper/ClientHeaderWrapper';
import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { getStadiumList } from '@/apis/stadium/stadium.api';
import { PUBLIC_ENV } from '@/config/env';
import type { StadiumInfo } from '@/types/stadium';

interface StadiumId {
  stadiumId: number;
}

interface StadiumLayoutProps {
  children: ReactNode;
  params: Promise<StadiumId>;
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
  const { stadiumId } = await params;

  const { data } = await getStadiumList();

  const activeStadium = data.active?.find((s: StadiumInfo) => s.stadiumId === Number(stadiumId));

  if (!activeStadium) {
    notFound();
  }

  return (
    <div className={styles.stadiumLayout}>
      <ClientHeaderWrapper stadium={activeStadium} />
      {children}
    </div>
  );
};

export default StadiumLayout;
