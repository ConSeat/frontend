'use client';

import DetailReviewModal from '../DetailReviewModal';
import FilterDropdown from '../FilterDropdown';
import LoadingSpinner from '../LoadingSpinner';
import styles from './ReviewCollection.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import useStateModal from '@/hooks/common/useStateModal';
import type { UseFetchBookmarkReviewList } from '@/hooks/queries/useFetchMember';
import type { UseFetchMyReviewList } from '@/hooks/queries/useFetchMyReview';
import Portal from '@/components/Portal/Portal';
import { MY_PAGE_QUERY, REVIEW_TAP, VIEW_TAP } from '@/constants/myPage';
import { Stadiums } from '@/types/stadium';

interface ReviewCollectionProps {
  viewNumber: number;
  reviewNumber: number;
  stadiums: Stadiums[];
  useFetchReview:
    | ((stadiumId: number) => UseFetchBookmarkReviewList)
    | ((stadiumId: number) => UseFetchMyReviewList);
}

interface ReviewStatusTagProps {
  status: string;
}

interface ReviewListProps {
  stadiumId: number | undefined;
  stadium: string;
  onClick: (reviewId: number, status?: string) => void;
  useFetchReview:
    | ((stadiumId: number) => UseFetchBookmarkReviewList)
    | ((stadiumId: number) => UseFetchMyReviewList);
}

const ReviewStatusTag = ({ status }: ReviewStatusTagProps) => {
  return <div className={styles.statusTag}>{status}</div>;
};

const ReviewList = ({ stadium, stadiumId, onClick, useFetchReview }: ReviewListProps) => {
  if (!stadiumId) {
    notFound();
  }

  const { data, isLoading } = useFetchReview(stadiumId);

  if (isLoading) return <LoadingSpinner />;

  return (
    <ul className={styles.reviewList}>
      {data?.map((elem) => {
        const { reviewId, seatingName, floorName, sectionName, thumbnailUrl } = elem;

        return (
          <li
            key={reviewId}
            className={styles.reviewItem}
            onClick={() => onClick(reviewId, status)}
          >
            <div className={styles.reviewImage}>
              <Image width={100} height={120} alt="" src={thumbnailUrl} />
            </div>
            <div className={styles.reviewText}>
              <div className={styles.title}>{stadium}</div>
              <div className={styles.seat}>
                {floorName +
                  ' ' +
                  sectionName +
                  `${seatingName === 'FLOOR' ? '' : ' ' + seatingName}`}
              </div>
            </div>
            {elem?.status && <ReviewStatusTag status={elem.status} />}
          </li>
        );
      })}
    </ul>
  );
};

const NoneContent = () => {
  return (
    <div className={styles.noneContentContainer}>
      <div className={styles.subtitle}>아직 저장한 시야가 없어요😢</div>
      <Link href="/home">
        <div className={styles.homeLink}>궁금한 시야 검색하러가 가기 {'>'}</div>
      </Link>
    </div>
  );
};

const ReviewCollection = ({
  viewNumber,
  reviewNumber,
  stadiums,
  useFetchReview,
}: ReviewCollectionProps) => {
  const [filterValue, setFilterValue] = useState('');
  const [reviewId, setReviewId] = useState(0);
  const { isModalOpen, openModal, closeModal } = useStateModal();

  const router = useRouter();
  const searchParams = useSearchParams();
  let tapType = searchParams.get(MY_PAGE_QUERY);

  if (tapType === null) {
    router.replace('mypage?tab=view');
    tapType = 'view';
  }

  const handleRouteView = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(MY_PAGE_QUERY, VIEW_TAP);
    router.replace(`?${params.toString()}`);
  };

  const handleRouteReView = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(MY_PAGE_QUERY, REVIEW_TAP);
    router.replace(`?${params.toString()}`);
  };

  const handleChangeFilter = (value: string) => {
    setFilterValue(value);
  };

  const handelClickReviewItem = (reviewId) => {
    setReviewId(reviewId);
    openModal();
  };

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.reviewTap}>
        <div
          className={classNames(styles.tap, {
            [styles.active]: tapType === VIEW_TAP,
          })}
          onClick={handleRouteView}
        >
          관심시야 {viewNumber}
        </div>
        <div
          className={classNames(styles.tap, {
            [styles.active]: tapType === REVIEW_TAP,
          })}
          onClick={handleRouteReView}
        >
          내후기 {reviewNumber}
        </div>
      </div>
      <div className={styles.reviewContainer}>
        {stadiums.length === 0 ? (
          <NoneContent />
        ) : (
          <>
            <FilterDropdown
              value={stadiums[0].stadiumName}
              options={stadiums.map((stadium) => stadium.stadiumName)}
              onChange={handleChangeFilter}
            />
            <ReviewList
              stadium={stadiums[0].stadiumName}
              stadiumId={
                stadiums.find((elem) => {
                  const target = filterValue ? filterValue : stadiums[0].stadiumName;
                  return elem.stadiumName === target;
                })?.stadiumId
              }
              onClick={handelClickReviewItem}
              useFetchReview={useFetchReview}
            />
          </>
        )}
      </div>
      <Portal isOpen={isModalOpen}>
        <DetailReviewModal reviewId={reviewId} reviewType={tapType} closeModal={closeModal} />
      </Portal>
    </div>
  );
};

export default ReviewCollection;
