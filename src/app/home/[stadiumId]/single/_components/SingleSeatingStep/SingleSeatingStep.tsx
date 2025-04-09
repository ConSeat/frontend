import { FIND_SEAT_LIST } from '../../_constants/seatExample';
import type { SingleFunnelData, Step } from '../../_types/funnel';
import styles from './SingleSeatingStep.module.scss';
import React, { type Dispatch, type SetStateAction } from 'react';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import ColumnSelectList from '@/components/ColumnSelectList';
import Highlight from '@/components/Highlight/Highlight';
import PageExplanation from '@/components/PageExplanation';
import Spacing from '@/components/Spacing/Spacing';

interface SingleSeatingStepProps {
  stadiumId: number;
  setStep: (step: Step) => void;
  data: Partial<SingleFunnelData>;
  setData: Dispatch<SetStateAction<Partial<SingleFunnelData>>>;
}

const SingleSeatingStep = ({ setStep, data, setData }: SingleSeatingStepProps) => {
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
            <Highlight>열 정보</Highlight>를 선택해주세요
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
              isUnSelected={!!data.seatingId && data.seatingId !== seatingId}
              disabled={count === 0}
            >
              <ColumnSelectList.Title>
                {name} <span className={styles.review}>후기 {count}개</span>
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
          variant={data.seatingId ? 'primary' : 'inactive'}
          disabled={!data.seatingId}
          onClick={() => setStep('Result')}
        >
          다음
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default SingleSeatingStep;
