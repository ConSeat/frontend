'use client';

import { usePathname, useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon/Icon';
import type { StadiumInfo } from '@/types/stadium';

interface Props {
  stadium: StadiumInfo;
}

const ClientHeaderWrapper = ({ stadium }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const isHeaderHidden = pathname.includes('/review/complete');

  if (isHeaderHidden) return null;

  return (
    <Header
      left={<Icon icon="LeftArrow" onClick={() => router.back()} />}
      title={stadium.stadiumName}
    />
  );
};

export default ClientHeaderWrapper;
