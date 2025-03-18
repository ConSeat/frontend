'use client';

import styles from './page.module.scss';
import classNames from 'classnames';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import ColumnSelectList from '@/components/ColumnSelectList';
import PageExplanation from '@/components/PageExplanation';
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

  const handleClickSelectItem = (type: string) => {
    setViewType(type);
  };

  return (
    <>
      <div className={styles.stadiumContainer}>
        <div className={styles.selectItemContainer}>
          <PageExplanation>
            <PageExplanation.Title>
              어떤 <span>시야</span>가<br />
              궁금하신가요?
            </PageExplanation.Title>
          </PageExplanation>
          <ColumnSelectList>
            {menuArray.map(({ Icon, subtitle, type }) => {
              return (
                <ColumnSelectList.Item
                  key={type}
                  onClick={() => handleClickSelectItem(type)}
                  isSelected={type === viewType}
                  isUnSelected={viewType !== null && type !== viewType}
                >
                  {Icon}
                  <div
                    className={classNames(styles.selectItemSubtitle, {
                      [styles.select]: type === viewType,
                    })}
                  >
                    {subtitle}
                  </div>
                </ColumnSelectList.Item>
              );
            })}
          </ColumnSelectList>
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
