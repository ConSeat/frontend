import styles from './SingleSeatingStep.module.scss';
import React from 'react';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import ColumnSelectList from '@/components/ColumnSelectList';
import PageExplanation from '@/components/PageExplanation';
import Spacing from '@/components/Spacing/Spacing';

export const FIND_SEAT_LIST = [
  {
    seatingId: 1,
    name: '1열 ~ 5열',
    count: 2,
  },
  {
    seatingId: 2,
    name: '6열 ~ 11열',
    count: 1,
  },
  {
    seatingId: 3,
    name: '12열 ~ 15열',
    count: 0,
  },
  {
    seatingId: 4,
    name: '15열 ~ 22열',
    count: 8,
  },
];

const SingleSeatingStep = ({ stadiumId, step, setStep, data, setData }) => {
  const handleClickSelectItem = (seatingId: number) => {
    setData((prev) => ({ ...prev, seatingId }));
  };

  return (
    <div className={styles.singleSeatingStepLayout}>
      <div className={styles.singleSeatingStepMainContainer}>
        <PageExplanation>
          <PageExplanation.Title>
            2층 24구역의
            <br />
            <span>열 정보</span>를 선택해주세요
          </PageExplanation.Title>
          <PageExplanation.Subtitle>후기가 0개인 열은 선택할 수 없어요😭</PageExplanation.Subtitle>
        </PageExplanation>

        <Spacing size={32} />

        <ColumnSelectList>
          {FIND_SEAT_LIST.map(({ seatingId, name, count }) => (
            <ColumnSelectList.Item
              key={seatingId}
              onClick={() => handleClickSelectItem(seatingId)}
              isSelected={data.seatingId === seatingId}
              isUnSelected={count === 0}
            >
              <ColumnSelectList.Title>
                {name} 후기 {count}개
              </ColumnSelectList.Title>
            </ColumnSelectList.Item>
          ))}
        </ColumnSelectList>
      </div>

      <ButtonContainer>
        <Button variant="secondary" onClick={() => setStep('Section')}>
          이전
        </Button>
        <Button
          // variant={data.sectionId ? 'primary' : 'inactive'}
          // disabled={!data.sectionId}
          onClick={() => setStep('Result')}
        >
          다음
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default SingleSeatingStep;
