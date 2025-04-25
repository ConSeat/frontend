'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header/Header';
import type { StadiumInfo } from '@/types/stadium';

interface Props {
  stadium: StadiumInfo;
}

const ClientHeaderWrapper = ({ stadium }: Props) => {
  const pathname = usePathname();

  const isHeaderHidden = pathname.includes('/review/complete');

  if (isHeaderHidden) return null;

  return <Header stadium={stadium} />;
};

export default ClientHeaderWrapper;
