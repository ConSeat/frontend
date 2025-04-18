'use client';

import styles from './SingleResultStep.module.scss';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import Highlight from '@/components/Highlight/Highlight';
import PageExplanation from '@/components/PageExplanation';
import ShareArea from '@/components/ShareArea';
import Spacing from '@/components/Spacing/Spacing';
import { useToast } from '@/Context/ToastProvider';

const SingleResultStep = ({ stadiumId, data }) => {
  const router = useRouter();
  const toastContext = useToast();

  const handleCopyLink = () => {
    const link = `${window.location.origin}/home/${stadiumId}/single/result?sectionId=${data.sectionId}&seatingId=${data.seatingId}`;
    navigator.clipboard.writeText(link);

    if (toastContext === undefined) return;
    toastContext.activateToast('링크를 복사했습니다', 'default');
  };

  return (
    <div className={styles.singleResultStepLayout}>
      <div>
        <PageExplanation>
          <PageExplanation.Title>
            <Highlight variant="background">
              {data.sectionId}, {data.seatingId}
            </Highlight>
            은
            <br />
            본무대, 돌출, 전광판 모두 잘보여요
          </PageExplanation.Title>
        </PageExplanation>

        <Spacing size={52} />

        <ShareArea
          onCopy={handleCopyLink}
          onShareKakao={() => {}}
          onShareTwitter={() => {}}
          onSave={() => {}}
          isLogin={true}
        />
      </div>
      <ButtonContainer>
        <Button onClick={() => router.push(`/home/${stadiumId}`)}>검색 완료</Button>
      </ButtonContainer>
    </div>
  );
};

export default SingleResultStep;
