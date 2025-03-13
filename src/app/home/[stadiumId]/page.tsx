'use client';

import FindViewItem from './_components/FindViewItem';
import styles from './page.module.scss';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import { Compare, Pencil, Seat } from '@/assets';

const menuArray = [
  {
    type: 'single',
    Icon: <Seat />,
    subtitle: '구역별 시야 찾기',
  },
  {
    type: 'compare',
    Icon: <Compare />,
    subtitle: '시야 비교하기',
  },
  {
    type: 'review',
    Icon: <Pencil />,
    subtitle: '시야 후기 작성하기',
  },
];

const StadiumPage = () => {
  const [viewType, setViewType] = useState<string | null>(null);
  const { stadiumId } = useParams();
  const router = useRouter();

  const handleClickPrevButton = () => {
    router.push('/home');
  };

  const handleClickNextButton = () => {
    router.push(`/home/${stadiumId}/${viewType}`);
  };

  const handleClickFindViewItem = (type: string) => {
    setViewType(type);
  };

  return (
    <>
      <div className={styles.stadiumContainer}>
        <div className={styles.findViewContainer}>
          <h2 className={styles.stadiumTitle}>
            어떤 <span>시야</span>가<br />
            궁금하신가요?
          </h2>
          <ul className={styles.findViewList}>
            {menuArray.map(({ Icon, subtitle, type }) => {
              return (
                <FindViewItem
                  key={type}
                  onClick={() => handleClickFindViewItem(type)}
                  isSelected={type === viewType}
                  isUnSelected={viewType !== null && type !== viewType}
                  subtitle={subtitle}
                >
                  {Icon}
                </FindViewItem>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="secondary" onClick={handleClickPrevButton}>
          이전
        </Button>
        <Button
          variant={viewType === null ? 'inactive' : 'primary'}
          disabled={viewType === null}
          onClick={handleClickNextButton}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default StadiumPage;
