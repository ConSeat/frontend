import type { FilterAction, FilterState } from '../AllReviewContainer/AllReviewContainer';
import FeatureDropdownModal from '../FeatureDropdownModal/FeatureDropdownModal';
import ObstructionDropdownModal from '../ObstructionDropdownModal/ObstructionDropdownModal';
import SeatDropdownModal from '../SeatDropdownModal/SeatDropdownModal';
import SortDropdown from '../SortDropdown/SortDropdown';
import styles from './AllReviewContent.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import { type Dispatch } from 'react';
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver';
import useScrollDirection from '@/hooks/common/useScrollDirection';
import { useFetchAllReviewList } from '@/hooks/queries/useFetchSeatingReview';
import Icon from '@/components/Icon/Icon';
import ReviewCardList from '@/components/ReviewCardList';
import Splitter from '@/components/Splitter/Splitter';
import { reviewKeys } from '@/apis/common/queryKeys';
import LoadingSpinner from '@/app/mypage/_components/LoadingSpinner';

interface AllReviewContentProps {
  filterData: FilterState;
  dispatch: Dispatch<FilterAction>;
  stadiumId: number;
  seatingId: number;
}

const NoneContent = ({ stadiumId }: { stadiumId: number }) => {
  return (
    <div className={styles.noneContentContainer}>
      <div className={styles.subtitle}>아직 후기가 없어요😢</div>
      <Link href={`/home/${stadiumId}/review`}>
        <div className={styles.homeLink}>내 후기 등록하러가기 {'>'}</div>
      </Link>
    </div>
  );
};

const AllReviewContent = ({
  filterData,
  dispatch,
  stadiumId,
  seatingId,
}: AllReviewContentProps) => {
  const scrollDir = useScrollDirection();

  const { filteredList, reviewCount, isLoading, status, isLast, handlePage } =
    useFetchAllReviewList(filterData.seatingId, filterData);
  const targetRef = useIntersectionObserver(handlePage);

  const canFetchNextPage = status !== 'error' && !isLast;
  const queryKey = reviewKeys.allReviewList(filterData.seatingId, filterData);

  return (
    <>
      <div
        className={classNames(styles.searchFilterContainer, {
          [styles.hide]: scrollDir === 'down',
          [styles.show]: scrollDir === 'up',
        })}
      >
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

        {filteredList.length === 0 ? (
          <NoneContent stadiumId={stadiumId} />
        ) : (
          <>
            <ReviewCardList
              stadiumId={stadiumId}
              seatingId={seatingId}
              reviews={filteredList}
              queryKey={queryKey}
            />
            {canFetchNextPage && (
              <div className={styles.loadingBox} ref={targetRef}>
                {isLoading && <LoadingSpinner />}
              </div>
            )}
          </>
        )}
      </div>

      <button
        className={styles.scrollUpButton}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Icon icon="ScrollUpArrow" />
      </button>
    </>
  );
};

export default AllReviewContent;
