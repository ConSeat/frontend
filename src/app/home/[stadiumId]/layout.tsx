import ClientHeaderWrapper from './_components/ClientHeaderWrapper/ClientHeaderWrapper';
import styles from './page.module.scss';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { API_ENDPOINTS } from '@/apis/common/endpoints';
import { getStadiumList } from '@/apis/stadium/stadium.api';
import { PUBLIC_ENV } from '@/config/env';
import type { StadiumInfo } from '@/types/stadium';

interface StadiumLayoutProps {
  children: ReactNode;
  params: Promise<{ stadiumId: string }>;
}

export async function generateStaticParams() {
  const res = await fetch(PUBLIC_ENV.baseUrl + API_ENDPOINTS.STADIUMS);
  const { body } = await res.json();
  const { active } = body;

  return active.map((stadium: { stadiumId: number }) => ({
    stadiumId: String(stadium.stadiumId),
  }));
}

export const dynamicParams = false;

const StadiumLayout = async ({ children, params }: StadiumLayoutProps) => {
  const stadiumId = Number((await params).stadiumId);
  const { data } = await getStadiumList();

  const activeStadium = data.active?.find((s: StadiumInfo) => s.stadiumId === stadiumId);

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
