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

  // TODO: 로고 변경할 예정, 아직 미정이라 주석 처리 해놓습니다.
  // const { data } = useFetchStadiumList();
  // const activeStadium = findStadiumById(data?.data.active, stadiumId);
  // if (!activeStadium) {
  //   notFound();
  // }

  const defaultBack = useCallback(() => {
    const idx = pathname.lastIndexOf('/');
    const newPath = pathname.slice(0, idx);
    router.push(newPath);
  }, [pathname]);

  return (
    <Header
      left={<Icon icon="LeftArrow" onClick={onBack ?? defaultBack} />}
      title={'로고'}
      right={<MypageLink />}
    />
  );
};

export default ClientHeaderWrapper;
