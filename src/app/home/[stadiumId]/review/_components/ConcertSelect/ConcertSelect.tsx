'use client';

import { NONE_SELECT } from '../../_constants/info';
import { REVIEW } from '../../_constants/review';
import ReviewDropdownInput from '../ReviewDropdownInput/ReviewDropdownInput';
import styles from './ConcertSelect.module.scss';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/common/useDebounce';
import { useFetchStadiumConcerts } from '@/hooks/queries/useFetchStadium';
import { ReviewDispatch } from '@/types/review';
import type { StadiumConcertInfo } from '@/types/stadium';

interface ConcertSelectProps {
  stadiumId: number;
  data: number;
  dispatch: ReviewDispatch;
}

const ConcertSelect = ({ stadiumId, data, dispatch }: ConcertSelectProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [cachedConcerts, setCachedConcerts] = useState<StadiumConcertInfo[]>([]);

  const debouncedQuery = useDebounce(inputValue, 300);
  const { data: stadiumConcerts } = useFetchStadiumConcerts(stadiumId, debouncedQuery);
  const fetchedConcerts = stadiumConcerts?.data.concerts ?? [];

  useEffect(() => {
    if (fetchedConcerts.length > 0) {
      setCachedConcerts(fetchedConcerts);
    }
  }, [fetchedConcerts]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (data !== NONE_SELECT) {
      dispatch({
        type: REVIEW.ACTIONS.CONCERT_SELECT,
        payload: { concertId: NONE_SELECT },
      });
    }
  };

  const handleSelect = (concert: StadiumConcertInfo) => {
    setInputValue(concert.concertName);
    dispatch({
      type: REVIEW.ACTIONS.CONCERT_SELECT,
      payload: { concertId: concert.concertId },
    });
  };

  return (
    <div className={styles.concertInfoSelectContainer}>
      <ReviewDropdownInput
        value={inputValue}
        onChange={handleSelect}
        onInputChange={handleInputChange}
        options={cachedConcerts}
        selectedId={data}
        placeholder="콘서트명을 검색해주세요"
      />
    </div>
  );
};

export default ConcertSelect;
