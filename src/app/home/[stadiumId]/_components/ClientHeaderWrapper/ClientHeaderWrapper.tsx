'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon/Icon';
import MypageLink from '@/components/MypageLink';

interface Props {
  stadiumId?: number;
  onBack?: () => void;
}

const ClientHeaderWrapper = ({ onBack }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const defaultBack = useCallback(() => {
    const idx = pathname.lastIndexOf('/');
    const newPath = pathname.slice(0, idx);
    router.push(newPath);
  }, [pathname]);

  return (
    <Header
      left={<Icon icon="LeftArrow" onClick={onBack ?? defaultBack} />}
      center={<Icon icon="SubLogo" onClick={() => router.push('/home')} />}
      right={<MypageLink />}
    />
  );
};

export default ClientHeaderWrapper;
