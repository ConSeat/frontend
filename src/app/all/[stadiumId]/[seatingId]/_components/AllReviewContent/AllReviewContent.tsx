import type { FilterAction, FilterState } from '../AllReviewContainer/AllReviewContainer';
import FeatureDropdownModal from '../FeatureDropdownModal/FeatureDropdownModal';
import ObstructionDropdownModal from '../ObstructionDropdownModal/ObstructionDropdownModal';
import SeatDropdownModal from '../SeatDropdownModal/SeatDropdownModal';
import SortDropdown from '../SortDropdown/SortDropdown';
import styles from './AllReviewContent.module.scss';
import { type Dispatch } from 'react';
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver';
import { useFetchAllReviewList } from '@/hooks/queries/useFetchSeatingReview';
import ReviewCardList from '@/components/ReviewCardList';
import Splitter from '@/components/Splitter/Splitter';
import LoadingSpinner from '@/app/mypage/_components/LoadingSpinner';

interface AllReviewContentProps {
  filterData: FilterState;
  dispatch: Dispatch<FilterAction>;
  stadiumId: number;
  seatingId: number;
}

const AllReviewContent = ({
  filterData,
  dispatch,
  stadiumId,
  seatingId,
}: AllReviewContentProps) => {
  const { filteredList, reviewCount, isLoading, status, isLast, handlePage } =
    useFetchAllReviewList(filterData.seatingId, filterData);
  const targetRef = useIntersectionObserver(handlePage);

  const canFetchNextPage = status !== 'error' && !isLast;

  return (
    <div>
      <div className={styles.searchFilterContainer}>
        <SeatDropdownModal
          seatingIdState={filterData.seatingId}
          dispatch={dispatch}
          stadiumId={stadiumId}
          initSeatingId={seatingId}
        />
        <FeatureDropdownModal features={filterData.features} dispatch={dispatch} />
        <ObstructionDropdownModal obstructions={filterData.obstructions} dispatch={dispatch} />
      </div>

      <Splitter height="12px" color="sub-gray8" style={{ opacity: '0.3' }} />

      <div className={styles.searchResultContainer}>
        <div className={styles.searchResultHeader}>
          <span className={styles.searchResultCount}>
            {isLoading ? '검색 중...' : `검색결과 ${reviewCount}개`}
          </span>
          <SortDropdown sort={filterData.sort} dispatch={dispatch} />
        </div>

        {filteredList && (
          <>
            <ReviewCardList stadiumId={stadiumId} seatingId={seatingId} reviews={filteredList} />
            {canFetchNextPage && (
              <div className={styles.loadingBox} ref={targetRef}>
                {isLoading && <LoadingSpinner />}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllReviewContent;
