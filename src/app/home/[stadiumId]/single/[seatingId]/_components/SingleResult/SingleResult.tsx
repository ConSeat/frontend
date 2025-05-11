'use client';

import ReviewThumbnail from '../ReviewThumnail';
import SearchEndButton from '../SearchEndButton';
import styles from './SingleResult.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { notFound, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFetchSeating } from '@/hooks/queries/useFetchSeatingReview';
import Button from '@/components/Button/Button';
import Highlight from '@/components/Highlight/Highlight';
import PageExplanation from '@/components/PageExplanation';
import ReviewCardList from '@/components/ReviewCardList';
import ShareArea from '@/components/ShareArea';
import Spacing from '@/components/Spacing/Spacing';
import { memberKeys, reviewKeys } from '@/apis/common/queryKeys';

const SingleResult = ({ stadiumId, seatingId }) => {
  const router = useRouter();
  const { data } = useFetchSeating(seatingId);
  const queryClient = useQueryClient();

  if (!data) {
    notFound();
  }

  const queryKey = reviewKeys.seating(seatingId).map(String);

  useEffect(() => {
    const cleanup = () => {
      const memberKey = memberKeys.bookmarks(Number(stadiumId));

      queryClient.invalidateQueries({ queryKey });
      queryClient.removeQueries({ queryKey: memberKey });
    };

    return cleanup;
  }, []);

  return (
    <div className={styles.singleResultStepLayout}>
      <PageExplanation>
        <PageExplanation.Title>
          <Highlight variant="background">
            {`${data.floorName} ${data.sectionName}${data.seatingName ? ` ${data.seatingName}` : ''}`}
          </Highlight>
          은
          <br />
          {data.distanceMessage}
        </PageExplanation.Title>
      </PageExplanation>

      <Spacing size={24} />
      <ReviewThumbnail images={data.reviews.map((elem) => elem.images[0])} />
      <Spacing size={52} />

      <div className={styles.searchResultContainer}>
        <div className={styles.searchResultHeader}>
          <div className={styles.searchResultCount}>
            상세후기 <span className={styles.reviewNumber}>{data.reviewCount}</span>
          </div>
          <Button
            className={styles.moreButton}
            onClick={() => router.push(`/home/${stadiumId}/${seatingId}/all`)}
          >
            더보기 {'>'}
          </Button>
        </div>
        <ReviewCardList
          stadiumId={stadiumId}
          seatingId={seatingId}
          reviews={data.reviews}
          queryKey={queryKey}
        />
        <Spacing size={36} />
        <ShareArea />
        <Spacing size={100} />
        <SearchEndButton stadiumId={stadiumId} />
      </div>
    </div>
  );
};

export default SingleResult;
