'use client';

import FilterDropdown from '../FilterDropdown';
import styles from './ReviewCollection.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { MY_PAGE_QUERY, REVIEW_TAP, VIEW_TAP } from '@/constants/myPage';

interface MyPageReview {
  reviewId: number;
  imageSrc: string;
  title: string;
  seat: string;
}

interface ReviewCollectionProps {
  viewNumber: number;
  reviewNumber: number;
  filterOptions: string[];
  reviews: MyPageReview[];
}

const ReviewCollection = ({
  viewNumber,
  reviewNumber,
  filterOptions,
  reviews,
}: ReviewCollectionProps) => {
  const [filterValue, setFilterValue] = useState('');
  const router = useRouter();

  const searchParams = useSearchParams();
  const tapType = searchParams.get(MY_PAGE_QUERY);

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
          placeholder="공연장 필터"
          value={filterValue}
          options={filterOptions}
          onChange={handleChangeFilter}
        />
        <ul className={styles.reviewList}>
          {reviews.map(({ reviewId, imageSrc, title, seat }) => {
            return (
              <li
                key={reviewId}
                className={styles.reviewItem}
                onClick={() => router.push(`/mypage/detail-review?review-id=${reviewId}`)}
              >
                <div className={styles.reviewImage}>
                  <Image width={104} height={104} alt="" src={imageSrc} />
                </div>
                <div className={styles.reviewText}>
                  <div className={styles.title}>{title}</div>
                  <div className={styles.seat}>{seat}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ReviewCollection;
