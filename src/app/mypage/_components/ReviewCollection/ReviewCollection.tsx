'use client';

import DetailReviewModal from '../DetailReviewModal';
import FilterDropdown from '../FilterDropdown';
import styles from './ReviewCollection.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import useStateModal from '@/hooks/useStateModal';
import Portal from '@/components/Portal/Portal';
import { MY_PAGE_QUERY, REVIEW_TAP, VIEW_TAP } from '@/constants/myPage';

interface MyPageReview {
  reviewId: number;
  imageSrc: string;
  title: string;
  seat: string;
  status?: string;
}

interface ReviewCollectionProps {
  viewNumber: number;
  reviewNumber: number;
  filterOptions: string[];
  reviews: MyPageReview[];
}

interface ReviewStatusTagProps {
  status: string;
}

interface ReviewListProps {
  reviews: MyPageReview[];
  onClick: (reviewId: number, status?: string) => void;
}

const ReviewStatusTag = ({ status }: ReviewStatusTagProps) => {
  return <div className={styles.statusTag}>{status}</div>;
};

const ReviewList = ({ reviews, onClick }: ReviewListProps) => {
  return (
    <ul className={styles.reviewList}>
      {reviews.map(({ reviewId, imageSrc, title, seat, status }) => {
        return (
          <li
            key={reviewId}
            className={styles.reviewItem}
            onClick={() => onClick(reviewId, status)}
          >
            <div className={styles.reviewImage}>
              <Image width={100} height={120} alt="" src={imageSrc} />
            </div>
            <div className={styles.reviewText}>
              <div className={styles.title}>{title}</div>
              <div className={styles.seat}>{seat}</div>
            </div>
            {status && <ReviewStatusTag status={status} />}
          </li>
        );
      })}
    </ul>
  );
};

const NoneContent = () => {
  return (
    <div className={styles.noneContentContainer}>
      <div className={styles.subtitle}>아직 저장한 시야가 없어요🥲</div>
      <Link href="/home">
        <div className={styles.homeLink}>궁금한 시야 검색하러가 가기 {'>'}</div>
      </Link>
    </div>
  );
};

const ReviewCollection = ({
  viewNumber,
  reviewNumber,
  filterOptions,
  reviews,
}: ReviewCollectionProps) => {
  const [filterValue, setFilterValue] = useState('');
  const [reviewId, setReviewId] = useState(0);
  const [reviewStatus, setReviewStatus] = useState(undefined);
  const { isModalOpen, openModal, closeModal } = useStateModal();

  const router = useRouter();

  const searchParams = useSearchParams();

  const tapType = searchParams.get(MY_PAGE_QUERY);

  const isNoneContent = () => {
    return (
      (tapType === REVIEW_TAP && reviewNumber === 0) || (tapType === VIEW_TAP && viewNumber === 0)
    );
  };

  const handleRouteView = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(MY_PAGE_QUERY, VIEW_TAP);
    router.replace(`?${params.toString()}`);
    setFilterValue('');
  };

  const handleRouteReView = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(MY_PAGE_QUERY, REVIEW_TAP);
    router.replace(`?${params.toString()}`);
    setFilterValue('');
  };

  const handleChangeFilter = (value: string) => {
    setFilterValue(value);
  };

  const handelClickReviewItem = (reviewId, status) => {
    setReviewId(reviewId);
    setReviewStatus(status);
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
        <FilterDropdown
          placeholder="전체"
          value={filterValue}
          options={filterOptions}
          onChange={handleChangeFilter}
        />
        {isNoneContent() ? (
          <NoneContent />
        ) : (
          <ReviewList reviews={reviews} onClick={handelClickReviewItem} />
        )}
      </div>
      <Portal isOpen={isModalOpen}>
        <DetailReviewModal
          reviewId={reviewId}
          reviewStatus={reviewStatus}
          closeModal={closeModal}
        />
      </Portal>
    </div>
  );
};

export default ReviewCollection;
