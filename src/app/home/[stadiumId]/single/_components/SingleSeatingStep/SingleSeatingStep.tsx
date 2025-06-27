import { NONE_SELECT } from '../../../review/_constants/info';
import type { SingleFunnelData, Step } from '../../_types/funnel';
import FindLoadingModal from '../FindLoadingModal/FindLoadingModal';
import styles from './SingleSeatingStep.module.scss';
import { useRouter } from 'next/navigation';
import React, { type Dispatch, type SetStateAction } from 'react';
import useStateModal from '@/hooks/common/useStateModal';
import { useFetchStadiumSectionSeating } from '@/hooks/queries/useFetchStadium';
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

const SingleSeatingStep = ({ stadiumId, setStep, data, setData }: SingleSeatingStepProps) => {
  const router = useRouter();
  const { isModalOpen, openModal } = useStateModal();

  const { data: sectionSeatingData } = useFetchStadiumSectionSeating(
    data.sectionId ?? NONE_SELECT,
    data.sectionId !== NONE_SELECT,
  );

  const handleClickSelectItem = (seatingId: number) => {
    setData((prev) => ({ ...prev, seatingId }));
  };

  return (
    <>
      <div className={styles.singleSeatingStepLayout}>
        <div className={styles.singleSeatingStepMainContainer}>
          <PageExplanation>
            <PageExplanation.Title>
              {sectionSeatingData?.data.sectionInfo}
              <br />
              <Highlight>열 정보</Highlight>를 선택해주세요
            </PageExplanation.Title>
            <PageExplanation.Subtitle>
              후기가 0개인 열은 선택할 수 없어요😭
            </PageExplanation.Subtitle>
          </PageExplanation>

          <Spacing size={32} />

          <ColumnSelectList>
            {sectionSeatingData?.data.seating.map(({ seatingId, name, reviewCount }) => (
              <ColumnSelectList.Item
                key={seatingId}
                onClick={() => handleClickSelectItem(seatingId)}
                isSelected={data.seatingId === seatingId}
                isUnSelected={!!data.seatingId && data.seatingId !== seatingId}
                disabled={reviewCount === 0}
              >
                <ColumnSelectList.Title>
                  {name} <span className={styles.review}>후기 {reviewCount}개</span>
                </ColumnSelectList.Title>
              </ColumnSelectList.Item>
            ))}
          </ColumnSelectList>
        </div>

        <Spacing size={96} />

        <ButtonContainer>
          <Button variant="secondary" onClick={() => setStep('Section')}>
            이전
          </Button>
          <Button
            variant={data.seatingId ? 'primary' : 'inactive'}
            disabled={!data.seatingId}
            onClick={() => {
              openModal();
              router.push(`/home/${stadiumId}/single/${data.seatingId}`);
            }}
          >
            다음
          </Button>
        </ButtonContainer>
      </div>
      <FindLoadingModal isModalOpen={isModalOpen} />
    </>
  );
};

export default SingleSeatingStep;
