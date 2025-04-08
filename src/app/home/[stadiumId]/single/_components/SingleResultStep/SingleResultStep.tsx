import { FIND_SEAT_LIST, FIND_SECTION_LIST } from '../../_constants/seatExample';
import styles from './SingleResultStep.module.scss';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import Highlight from '@/components/Highlight/Highlight';
import PageExplanation from '@/components/PageExplanation';

export const getSectionName = (sectionId: number) =>
  FIND_SECTION_LIST.find((s) => s.sectionId === sectionId)?.name;

export const getSeatingName = (seatingId: number) =>
  FIND_SEAT_LIST.find((s) => s.seatingId === seatingId)?.name;

const SingleResultStep = ({ stadiumId, data }) => {
  const router = useRouter();

  const sectionName = getSectionName(data.sectionId);
  const seatingName = getSeatingName(data.seatingId);

  return (
    <div className={styles.singleResultStepLayout}>
      <PageExplanation>
        <PageExplanation.Title>
          <Highlight variant="background">
            {sectionName} {seatingName}
          </Highlight>
          은
          <br />
          본무대, 돌출, 전광판 모두 잘보여요
        </PageExplanation.Title>
      </PageExplanation>
      <ButtonContainer>
        <Button onClick={() => router.push(`/home/${stadiumId}`)}>검색 완료</Button>
      </ButtonContainer>
    </div>
  );
};

export default SingleResultStep;
