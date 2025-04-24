'use client';

import ReviewCardList from '../ReviewCardList';
import ReviewThumbnail from '../ReviewThumnail';
import SearchEndButton from '../SearchEndButton';
import styles from './SingleResult.module.scss';
import { notFound } from 'next/navigation';
import React from 'react';
import { useFetchSeating } from '@/hooks/queries/useFetchSeatingReview';
import Highlight from '@/components/Highlight/Highlight';
import PageExplanation from '@/components/PageExplanation';
import ShareArea from '@/components/ShareArea';
import Spacing from '@/components/Spacing/Spacing';

const SingleResult = ({ stadiumId, seatingId }) => {
  const { data } = useFetchSeating(seatingId);

  if (!data) {
    notFound();
  }

  return (
    <div className={styles.singleResultStepLayout}>
      <div
        style={{
          padding: '0 24px',
        }}
      >
        <PageExplanation>
          <PageExplanation.Title>
            <Highlight variant="background">
              {`${data.floorName} ${data.sectionName} ${data.seatingName ? data.seatingName : ''}`}
            </Highlight>
            은
            <br />
            {data.distanceMessage}
          </PageExplanation.Title>
        </PageExplanation>
      </div>

      <Spacing size={24} />
      <ReviewThumbnail images={['/images/jamsil-arena.jpg', '/images/jamsil-arena.jpg']} />

      <div
        style={{
          padding: '0 24px',
        }}
      >
        <Spacing size={52} />
        <ReviewCardList reviews={data.reviews} />
        <Spacing size={52} />
        <ShareArea />

        <Spacing size={52} />
        <SearchEndButton stadiumId={stadiumId} />
      </div>
    </div>
  );
};

export default SingleResult;
