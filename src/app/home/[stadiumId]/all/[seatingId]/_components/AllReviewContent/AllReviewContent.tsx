import type { FilterAction, FilterState } from '../AllReviewContainer/AllReviewContainer';
import FeatureDropdownModal from '../FeatureDropdownModal/FeatureDropdownModal';
import ObstructionDropdownModal from '../ObstructionDropdownModal/ObstructionDropdownModal';
import SeatDropdownModal from '../SeatDropdownModal/SeatDropdownModal';
import styles from './AllReviewContent.module.scss';
import { type Dispatch } from 'react';
import { useFetchAllReviewList } from '@/hooks/queries/useFetchSeatingReview';

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
    </div>
  );
};

export default AllReviewContent;
