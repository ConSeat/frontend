'use client';

import ReviewThumbnail from '../ReviewThumnail';
import SearchEndButton from '../SearchEndButton';
import styles from './SingleResult.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { notFound, usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFetchSeating } from '@/hooks/queries/useFetchSeatingReview';
import { useFetchStadiumList } from '@/hooks/queries/useFetchStadium';
import Button from '@/components/Button/Button';
import Highlight from '@/components/Highlight/Highlight';
import PageExplanation from '@/components/PageExplanation';
import ReviewCardList from '@/components/ReviewCardList';
import ShareArea from '@/components/ShareArea';
import Spacing from '@/components/Spacing/Spacing';
import { memberKeys, reviewKeys } from '@/apis/common/queryKeys';
import { META } from '@/constants/metadata';
import { gaEvent } from '@/utils/gtag';
import { findStadiumById } from '@/utils/stadium';

const SingleResult = ({ stadiumId, seatingId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: stadiumList } = useFetchStadiumList();
  const { data: seatingInfo } = useFetchSeating(seatingId);
  const queryClient = useQueryClient();

  if (!seatingInfo) {
    notFound();
  }

  const stadium = findStadiumById(stadiumList?.data.active, Number(stadiumId));
  const areaLabel = [seatingInfo.floorName, seatingInfo.sectionName, seatingInfo.seatingName]
    .filter(Boolean)
    .join(' ');

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
          <Highlight variant="background">{areaLabel}</Highlight>
          은
          <br />
          {seatingInfo.distanceMessage}
        </PageExplanation.Title>
      </PageExplanation>

      <Spacing size={24} />
      <ReviewThumbnail images={seatingInfo.reviews.map((elem) => elem.images[0])} />
      <Spacing size={52} />

      <div className={styles.searchResultContainer}>
        <div className={styles.searchResultHeader}>
          <div className={styles.searchResultCount}>
            상세후기 <span className={styles.reviewNumber}>{seatingInfo.reviewCount}</span>
          </div>
          <Button
            className={styles.moreButton}
            onClick={() => {
              gaEvent({
                action: '후기 더보기 버튼 클릭',
                category: 'interaction',
                label: '후기 더보기 클릭',
              });

              router.push(`/home/${stadiumId}/${seatingId}/all`);
            }}
          >
            더보기 {'>'}
          </Button>
        </div>

        <ReviewCardList
          stadiumId={stadiumId}
          seatingId={seatingId}
          reviews={seatingInfo.reviews}
          queryKey={queryKey}
        />

        <Spacing size={36} />

        <ShareArea
          title={`${stadium?.stadiumName} | ${seatingInfo.floorName} ${seatingInfo.sectionName}${seatingInfo.seatingName ? ' ' + seatingInfo.seatingName : ''}`}
          description="CON:SEAT에서 구역별 시야를 확인해보세요"
          imageUrl={seatingInfo.reviews[0].images[0]}
          url={META.url + pathname}
        />

        <Spacing size={100} />

        <SearchEndButton stadiumId={stadiumId} />
      </div>
    </div>
  );
};

export default SingleResult;
