import type { FilterAction, FilterState } from '../ReviewDetailContainer/ReviewDetailContainer';
import SeatDropdownModal from '../SeatDropdownModal/SeatDropdownModal';
import { type Dispatch, useEffect } from 'react';
import { PUBLIC_ENV } from '@/config/env';

interface ReviewDetailContentProps {
  filterData: FilterState;
  dispatch: Dispatch<FilterAction>;
  stadiumId: number;
  seatingId: number;
}

const ReviewDetailContent = ({
  filterData,
  dispatch,
  stadiumId,
  seatingId,
}: ReviewDetailContentProps) => {
  useEffect(() => {
    // 필터링 결과
    const fetchReviewList = async () => {
      const data = await fetch(
        PUBLIC_ENV.baseUrl + `/reviews/seating/${filterData.seatingId}/list`,
      );
      const res = await data.json();
      console.log('fetchReviewList', res.body.reviews);
    };

    fetchReviewList();
  }, []);

  return (
    <div>
      <SeatDropdownModal
        seatingIdData={filterData.seatingId}
        dispatch={dispatch}
        stadiumId={stadiumId}
        initSeatingId={seatingId}
      />
    </div>
  );
};

export default ReviewDetailContent;
