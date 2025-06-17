import styles from './page.module.scss';
import { ReactNode } from 'react';
import { API_ENDPOINTS } from '@/apis/common/endpoints';
import { PUBLIC_ENV } from '@/config/env';

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

const StadiumLayout = async ({ children }: StadiumLayoutProps) => {
  return <div className={styles.stadiumLayout}>{children}</div>;
};

export default StadiumLayout;
