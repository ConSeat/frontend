'use client';

import ReviewCardList from '../ReviewCardList';
import styles from './SingleResult.module.scss';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useFetchSeating } from '@/hooks/queries/useFetchSeatingReview';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import Highlight from '@/components/Highlight/Highlight';
import PageExplanation from '@/components/PageExplanation';
import ShareArea from '@/components/ShareArea';
import Spacing from '@/components/Spacing/Spacing';

const SingleResult = ({ stadiumId }) => {
  const { data } = useFetchSeating(stadiumId);
  const router = useRouter();

  if (!data) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다!');
  };

  return (
    <div className={styles.singleResultStepLayout}>
      <div>
        <PageExplanation>
          <PageExplanation.Title>
            <Highlight variant="background">
              {data.floorName || data.sectionName} {data.sectionName || data.seatingName}
            </Highlight>
            은
            <br />
            본무대, 돌출, 전광판 모두 잘보여요
          </PageExplanation.Title>
        </PageExplanation>

        <Spacing size={52} />
        <ReviewCardList reviews={data.reviews} />
        <Spacing size={52} />
        <ShareArea
          onCopy={handleCopyLink}
          onShareKakao={() => {}}
          onShareTwitter={() => {}}
          onSave={() => {}}
          isLogin={true}
        />
      </div>
      <Spacing size={52} />
      <ButtonContainer>
        <Button onClick={() => router.push(`/home/${stadiumId}`)}>검색 완료</Button>
      </ButtonContainer>
    </div>
  );
};

export default SingleResult;
