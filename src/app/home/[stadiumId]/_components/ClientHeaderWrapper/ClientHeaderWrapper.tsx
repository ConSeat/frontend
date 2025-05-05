'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Header from '@/components/Header/Header';
import Icon from '@/components/Icon/Icon';
import MypageLink from '@/components/MypageLink';
import type { StadiumInfo } from '@/types/stadium';

interface Props {
  stadium: StadiumInfo;
}

const hiddenPathPatterns = [
  /^\/home\/[^/]+\/review\/complete$/, // 리뷰 작성 완료
  /^\/home\/[^/]+\/[^/]+\/all$/, // 후기 전체보기
];

const ClientHeaderWrapper = ({ stadium }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const onBack = useCallback(() => {
    const idx = pathname.lastIndexOf('/');
    const newPath = pathname.slice(0, idx);
    router.push(newPath);
  }, [pathname]);

  const isHeaderHidden = hiddenPathPatterns.some((regex) => regex.test(pathname));

  if (isHeaderHidden) return null;

  return (
    <Header
      left={<Icon icon="LeftArrow" onClick={onBack} />}
      title={stadium.stadiumName}
      right={<MypageLink />}
    />
  );
};

export default ClientHeaderWrapper;
