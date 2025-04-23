'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header/Header';

interface Props {
  stadiumId: number;
}

const ClientHeaderWrapper = ({ stadiumId }: Props) => {
  const pathname = usePathname();

  const isHeaderHidden = pathname.includes('/review/complete');

  if (isHeaderHidden) return null;

  return <Header stadiumId={stadiumId} />;
};

export default ClientHeaderWrapper;
