'use client';

import { FLOOR, NONE_SELECT } from '../../_constants/info';
import { REVIEW } from '../../_constants/review';
import ReviewDropdown from '../ReviewDropdown/ReviewDropdown';
import styles from './SeatInfoSelect.module.scss';
import React, { useState } from 'react';
import { useFetchStadiumSeats } from '@/hooks/queries/useFetchStadium';
import { ReviewDispatch } from '@/types/review';

interface SeatInfoSelectProps {
  stadiumId: number;
  data: number;
  dispatch: ReviewDispatch;
}

const SeatInfoSelect = ({ stadiumId, data, dispatch }: SeatInfoSelectProps) => {
  const { data: seats } = useFetchStadiumSeats(stadiumId);
  const [seatInfo, setSeatInfo] = useState({
    floor: '',
    section: '',
    seatingId: data,
  });

  const fetchedSeats = seats?.data.floors || [];
  const availableSections =
    fetchedSeats.find((floor) => floor.name === seatInfo.floor)?.sections || [];
  const availableSeating =
    availableSections.find((section) => section.name === seatInfo.section)?.seats || [];

  const handleSeatInfoSelect = (updates: Partial<typeof seatInfo>) => {
    const newSeatInfo = { ...seatInfo, ...updates };
    setSeatInfo(newSeatInfo);

    if (newSeatInfo.seatingId !== seatInfo.seatingId) {
      dispatch({
        type: REVIEW.ACTIONS.SEAT_INFO_SELECT,
        payload: { seatingId: newSeatInfo.seatingId },
      });
    }
  };

  return (
    <div className={styles.seatInfoSelectContainer}>
      <ReviewDropdown
        value={seatInfo.floor}
        onChange={(floorName) =>
          handleSeatInfoSelect({ floor: floorName, section: '', seatingId: NONE_SELECT })
        }
        options={fetchedSeats.map((floor) => floor.name)}
        placeholder="층을 선택해주세요"
        autoOpen={seatInfo.floor === ''}
      />

      {seatInfo.floor && (
        <ReviewDropdown
          value={seatInfo.section}
          onChange={(sectionName) => {
            if (seatInfo.floor === FLOOR) {
              const section = availableSections.find((s) => s.name === sectionName);
              const seatingId = section?.seats?.[0]?.seatingId ?? NONE_SELECT;
              handleSeatInfoSelect({ section: sectionName, seatingId });
            } else {
              handleSeatInfoSelect({ section: sectionName, seatingId: NONE_SELECT });
            }
          }}
          options={availableSections.map((section) => section.name)}
          placeholder="구역을 선택해주세요"
          autoOpen={seatInfo.section === ''}
        />
      )}

      {seatInfo.floor !== FLOOR && seatInfo.section && (
        <ReviewDropdown
          value={availableSeating.find((seat) => seat.seatingId === seatInfo.seatingId)?.name || ''}
          onChange={(seatingName) => {
            const seating = availableSeating.find((seat) => seat.name === seatingName);
            if (seating) {
              handleSeatInfoSelect({ seatingId: seating.seatingId });
            }
          }}
          options={availableSeating.map((seat) => seat.name)}
          placeholder="좌석을 선택해주세요"
          autoOpen={seatInfo.seatingId === NONE_SELECT}
        />
      )}
    </div>
  );
};

export default React.memo(SeatInfoSelect);
