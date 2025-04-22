'use client';

import { NONE_SELECT } from '../../_constants/info';
import { REVIEW } from '../../_constants/review';
import ReviewDropdownInput from '../ReviewDropdownInput/ReviewDropdownInput';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/common/useDebounce';
import { useFetchStadiumConcerts } from '@/hooks/queries/useFetchStadium';
import { ReviewDispatch } from '@/types/review';
import type { StadiumConcertInfo } from '@/types/stadium';

interface ConcertSelectProps {
  stadiumId: number;
  dispatch: ReviewDispatch;
}

const ConcertSelect = ({ stadiumId, dispatch }: ConcertSelectProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number>(NONE_SELECT);
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
    setSelectedId(NONE_SELECT);
    dispatch({
      type: REVIEW.ACTIONS.CONCERT_SELECT,
      payload: { concertId: NONE_SELECT },
    });
  };

  const handleSelect = (concert: StadiumConcertInfo) => {
    setInputValue(concert.concertName);
    setSelectedId(concert.concertId);
    dispatch({
      type: REVIEW.ACTIONS.CONCERT_SELECT,
      payload: { concertId: concert.concertId },
    });
  };

  return (
    <ReviewDropdownInput
      value={inputValue}
      onChange={handleSelect}
      onInputChange={handleInputChange}
      options={cachedConcerts}
      selectedId={selectedId}
      placeholder="콘서트명을 검색해주세요"
    />
  );
};

export default ConcertSelect;
