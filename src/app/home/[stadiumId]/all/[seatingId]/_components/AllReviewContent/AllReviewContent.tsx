import type { FilterAction, FilterState } from '../AllReviewContainer/AllReviewContainer';
import FeatureDropdownModal from '../FeatureDropdownModal/FeatureDropdownModal';
import ObstructionDropdownModal from '../ObstructionDropdownModal/ObstructionDropdownModal';
import SeatDropdownModal from '../SeatDropdownModal/SeatDropdownModal';
import SortDropdown from '../SortDropdown/SortDropdown';
import styles from './AllReviewContent.module.scss';
import { type Dispatch } from 'react';
import { useFetchAllReviewList } from '@/hooks/queries/useFetchSeatingReview';
import Splitter from '@/components/Splitter/Splitter';

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
  const { data: filteredList } = useFetchAllReviewList(filterData.seatingId, filterData);

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
            검색결과 {filteredList?.data.reviewCount}개
          </span>
          <SortDropdown sort={filterData.sort} dispatch={dispatch} />
        </div>

        <div className={styles.reviewCard}>결과 리스트결과</div>
      </div>
    </div>
  );
};

export default AllReviewContent;
