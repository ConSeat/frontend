'use client';

import DetailDropdownModal from '../AllDropdownModal/AllDropdownModal';
import type { FilterAction } from '../AllReviewContainer/AllReviewContainer';
import SeatDropdown from '../SeatDropdown/SeatDropdown';
import styles from './SeatDropdownModal.module.scss';
import { useState } from 'react';
import { useFetchSeating } from '@/hooks/queries/useFetchSeatingReview';
import { useFetchStadiumSeats } from '@/hooks/queries/useFetchStadium';
import { FLOOR, NONE_SELECT } from '@/app/home/[stadiumId]/review/_constants/info';

interface SeatDropdownModalProps {
  seatingIdData: number;
  dispatch: React.Dispatch<FilterAction>;
  stadiumId: number;
  initSeatingId: number;
}

const SeatDropdownModal = ({
  seatingIdData,
  dispatch,
  stadiumId,
  initSeatingId,
}: SeatDropdownModalProps) => {
  const [seatInfo, setSeatInfo] = useState({
    floor: '',
    section: '',
    seatingId: seatingIdData,
  });
  const { data: seats } = useFetchStadiumSeats(stadiumId);
  const { data: fetchedInfo } = useFetchSeating(seatingIdData);

  const fetchedSeats = seats?.data.floors || [];
  const availableSections =
    fetchedSeats.find((floor) => floor.name === seatInfo.floor)?.sections || [];
  const availableSeating =
    availableSections.find((section) => section.name === seatInfo.section)?.seats || [];

  const label = fetchedInfo
    ? `${fetchedInfo.floorName} / ${fetchedInfo.sectionName}${fetchedInfo.seatingName ? ' / ' + fetchedInfo.seatingName : ''}`
    : '좌석을 선택해주세요';

  const handleSeatInfoSelect = (updates: Partial<typeof seatInfo>) => {
    const newSeatInfo = { ...seatInfo, ...updates };
    setSeatInfo(newSeatInfo);
  };

  const handleResetButton = () => {
    setSeatInfo({
      floor: '',
      section: '',
      seatingId: initSeatingId,
    });

    dispatch({
      type: 'SEATING',
      payload: {
        seatingId: initSeatingId,
      },
    });
  };

  const handleConfirmButton = () => {
    dispatch({
      type: 'SEATING',
      payload: {
        seatingId: seatInfo.seatingId,
      },
    });
  };

  return (
    <DetailDropdownModal
      label={label}
      isSelected={!!seatingIdData}
      title="좌석선택"
      subTitle="후기가 0개인 열은 선택할 수 없어요😭"
      onReset={handleResetButton}
      onConfirm={handleConfirmButton}
    >
      <div className={styles.modalContentContainer}>
        <SeatDropdown
          value={seatInfo.floor}
          onChange={(floorName) =>
            handleSeatInfoSelect({ floor: floorName, section: '', seatingId: NONE_SELECT })
          }
          options={fetchedSeats.map((floor) => floor.name)}
          placeholder="층"
        />

        <SeatDropdown
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
          placeholder="구역"
          disabled={!seatInfo.floor}
        />

        <SeatDropdown
          value={availableSeating.find((seat) => seat.seatingId === seatInfo.seatingId)?.name || ''}
          onChange={(seatingName) => {
            const seating = availableSeating.find((seat) => seat.name === seatingName);
            if (seating) {
              handleSeatInfoSelect({ seatingId: seating.seatingId });
            }
          }}
          options={availableSeating.map((seat) => seat.name)}
          placeholder="열"
          disabled={seatInfo.floor == FLOOR || !seatInfo.section}
        />
      </div>
    </DetailDropdownModal>
  );
};

export default SeatDropdownModal;
