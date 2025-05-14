'use client';

import DetailReviewModal from '../DetailReviewModal';
import FilterDropdown from '../FilterDropdown';
import LoadingSpinner from '../LoadingSpinner';
import styles from './ReviewCollection.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver';
import useStateModal from '@/hooks/common/useStateModal';
import { type UseFetchBookmarkReviewList } from '@/hooks/queries/useFetchMember';
import { type UseFetchMyReviewList } from '@/hooks/queries/useFetchMyReview';
import ApiErrorBoundary from '@/components/ApiErrorBoundary';
import Portal from '@/components/Portal/Portal';
import { memberKeys, reviewKeys } from '@/apis/common/queryKeys';
import { REVIEW_TAP, VIEW_TAP } from '@/constants/myPage';
import { Stadiums } from '@/types/stadium';

interface ReviewCollectionProps {
  reviewNumber: number;
  viewNumber: number;
  tabType: 'view' | 'review';
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

  const { data, isLoading, status, isLast, handlePage } = useFetchReview(stadiumId);

  const observerRef = useIntersectionObserver(handlePage);
  const canFetchNextPage = status !== 'error' && !isLast;

  return (
    <>
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
                <Image
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  width={100}
                  height={120}
                  alt="후기 이미지"
                  src={thumbnailUrl}
                />
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

      {canFetchNextPage && <div ref={observerRef}>{isLoading && <LoadingSpinner />}</div>}
    </>
  );
};

const NoneContent = ({ tabType }: { tabType: 'view' | 'review' }) => {
  return (
    <div className={styles.noneContentContainer}>
      <div className={styles.subtitle}>
        {tabType === 'view' ? '아직 저장한 시야가 없어요😢' : '아직 후기가 없어요😢'}
      </div>
      <Link href="/home">
        <div className={styles.homeLink}>
          {tabType === 'view' ? '궁금한 시야 검색하러 가기 >' : '내 후기 등록하러 가기 >'}
        </div>
      </Link>
    </div>
  );
};

const ReviewCollection = ({
  reviewNumber,
  viewNumber,
  tabType,
  stadiums,
  useFetchReview,
}: ReviewCollectionProps) => {
  const [filterValue, setFilterValue] = useState('');
  const [reviewId, setReviewId] = useState(0);
  const { isModalOpen, openModal, closeModal } = useStateModal();

  const router = useRouter();
  const queryClient = useQueryClient();

  const handleRouteView = () => {
    router.push(`/mypage/view`);
  };

  const handleRouteReView = () => {
    router.push(`/mypage/review`);
  };

  const handleChangeFilter = (value: string) => {
    setFilterValue(value);
  };

  const handelClickReviewItem = (reviewId) => {
    setReviewId(reviewId);
    openModal();
  };

  const getCurrentStadiumId = () => {
    return stadiums.find((elem) => {
      const target = filterValue ? filterValue : stadiums[0].stadiumName;
      return elem.stadiumName === target;
    })!.stadiumId;
  };

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.reviewTap}>
        <div
          className={classNames(styles.tap, {
            [styles.active]: tabType === VIEW_TAP,
          })}
          onClick={handleRouteView}
        >
          관심시야 {viewNumber}
        </div>
        <div
          className={classNames(styles.tap, {
            [styles.active]: tabType === REVIEW_TAP,
          })}
          onClick={handleRouteReView}
        >
          내후기 {reviewNumber}
        </div>
      </div>
      <div className={styles.reviewContainer}>
        {stadiums.length === 0 ? (
          <NoneContent tabType={tabType} />
        ) : (
          <>
            <FilterDropdown
              value={stadiums[0].stadiumName}
              options={stadiums.map((stadium) => stadium.stadiumName)}
              onChange={handleChangeFilter}
            />
            <ApiErrorBoundary
              resetKey={[tabType]}
              queryKey={
                tabType === 'view' ? memberKeys.bookmarks(getCurrentStadiumId()) : reviewKeys.mine()
              }
            >
              <ReviewList
                stadium={stadiums[0].stadiumName}
                stadiumId={getCurrentStadiumId()}
                onClick={handelClickReviewItem}
                useFetchReview={useFetchReview}
              />
            </ApiErrorBoundary>
          </>
        )}
      </div>
      <Portal isOpen={isModalOpen}>
        <DetailReviewModal
          reviewId={reviewId}
          reviewType={tabType}
          closeModal={() => {
            queryClient.invalidateQueries({
              queryKey: memberKeys.bookmarks(getCurrentStadiumId()),
            });
            closeModal();
          }}
        />
      </Portal>
    </div>
  );
};

export default ReviewCollection;
