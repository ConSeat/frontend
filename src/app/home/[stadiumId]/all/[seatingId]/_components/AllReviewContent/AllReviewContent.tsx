import type { FilterAction, FilterState } from '../AllReviewContainer/AllReviewContainer';
import FeatureDropdownModal from '../FeatureDropdownModal/FeatureDropdownModal';
import ObstructionDropdownModal from '../ObstructionDropdownModal/ObstructionDropdownModal';
import SeatDropdownModal from '../SeatDropdownModal/SeatDropdownModal';
import SortDropdown from '../SortDropdown/SortDropdown';
import styles from './AllReviewContent.module.scss';
import { type Dispatch } from 'react';
import { useFetchAllReviewList } from '@/hooks/queries/useFetchSeatingReview';
import Splitter from '@/components/Splitter/Splitter';
import type { ListSort } from '@/types/review';

interface AllReviewContentProps {
  filterData: FilterState;
  dispatch: Dispatch<FilterAction>;
  stadiumId: number;
  seatingId: number;
}

export const SortData: { name: string; value: ListSort }[] = [
  { name: '추천순', value: '' },
  { name: '최신순', value: 'modifiedAt' },
];

const AllReviewContent = ({
  filterData,
  dispatch,
  stadiumId,
  seatingId,
}: AllReviewContentProps) => {
  const { data: filteredList } = useFetchAllReviewList(filterData.seatingId, filterData);
  console.log(filteredList);

  return (
    <div>
      <div className={styles.searchFilterContainer}>
        <SeatDropdownModal
          seatingIdData={filterData.seatingId}
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
          <span className={styles.searchResultCount}>검색결과 8개</span>
          <SortDropdown sort={filterData.sort} dispatch={dispatch} />
        </div>

        <div className={styles.reviewCard}>결과 리스트</div>
      </div>
    </div>
  );
};

export default AllReviewContent;
