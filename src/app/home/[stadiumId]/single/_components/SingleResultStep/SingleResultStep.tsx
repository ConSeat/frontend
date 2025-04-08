import styles from './SingleResultStep.module.scss';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';

const SingleResultStep = ({ stadiumId }) => {
  const router = useRouter();

  return (
    <div className={styles.singleResultStepLayout}>
      <div>SingleResultStep</div>
      <ButtonContainer>
        <Button onClick={() => router.push(`/home/${stadiumId}`)}>검색 완료</Button>
      </ButtonContainer>
    </div>
  );
};

export default SingleResultStep;
