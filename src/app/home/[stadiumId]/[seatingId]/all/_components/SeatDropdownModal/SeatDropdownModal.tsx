'use client';

import DetailDropdownModal from '../AllDropdownModal/AllDropdownModal';
import type { FilterAction } from '../AllReviewContainer/AllReviewContainer';
import SeatDropdown from '../SeatDropdown/SeatDropdown';
import styles from './SeatDropdownModal.module.scss';
import { useState } from 'react';
import { useFetchSeating } from '@/hooks/queries/useFetchSeatingReview';
import {
  useFetchStadiumSectionSeating,
  useFetchStadiumSections,
} from '@/hooks/queries/useFetchStadium';
import { FLOOR, NONE_SELECT } from '@/app/home/[stadiumId]/review/_constants/info';
import type { SeatWithReviewCount } from '@/types/stadium';

interface SeatDropdownModalProps {
  seatingIdState: number;
  dispatch: React.Dispatch<FilterAction>;
  stadiumId: number;
  initSeatingId: number;
}

const SeatDropdownModal = ({
  seatingIdState,
  dispatch,
  stadiumId,
  initSeatingId,
}: SeatDropdownModalProps) => {
  const [seatInfo, setSeatInfo] = useState({
    floor: '',
    sectionId: NONE_SELECT,
    seatingId: seatingIdState,
  });

  const { data: seatNameInfo } = useFetchSeating(seatingIdState);
  const { data: sectionData } = useFetchStadiumSections(stadiumId);
  const { data: sectionSeatingData } = useFetchStadiumSectionSeating(
    seatInfo.sectionId,
    seatInfo.sectionId !== NONE_SELECT,
  );

  const label = seatNameInfo
    ? `${seatNameInfo.floorName} / ${seatNameInfo.sectionName}${seatNameInfo.seatingName ? ' / ' + seatNameInfo.seatingName : ''}`
    : '좌석 정보 불러오는 중';

  const fetchedSeats = sectionData?.data.floors || [];
  const availableSections =
    fetchedSeats.find((floor) => floor.name === seatInfo.floor)?.sections || [];
  const availableSeating = sectionSeatingData?.data.seating || [];

  const handleSeatInfoSelect = (updates: Partial<typeof seatInfo>) => {
    const newSeatInfo = { ...seatInfo, ...updates };
    setSeatInfo(newSeatInfo);
  };

  const handleResetButton = () => {
    setSeatInfo({
      floor: '',
      sectionId: NONE_SELECT,
      seatingId: initSeatingId,
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
      isSelected={!!seatingIdState}
      title="좌석선택"
      subTitle="후기가 0개인 열은 선택할 수 없어요😭"
      onReset={handleResetButton}
      onConfirm={handleConfirmButton}
    >
      <div className={styles.modalContentContainer}>
        <SeatDropdown
          value={seatInfo.floor}
          onChange={(floorName) =>
            handleSeatInfoSelect({
              floor: floorName,
              sectionId: NONE_SELECT,
              seatingId: NONE_SELECT,
            })
          }
          options={fetchedSeats.map((floor) => ({
            label: floor.name,
            value: floor.name,
          }))}
          placeholder="층"
        />

        <SeatDropdown
          value={
            availableSections.find((section) => section.sectionId === seatInfo.sectionId)?.name ||
            ''
          }
          onChange={(sectionName) => {
            if (seatInfo.floor === FLOOR) {
              const section = availableSections.find((s) => s.name === sectionName);
              handleSeatInfoSelect({
                sectionId: section?.sectionId,
                seatingId: section?.sectionId,
              });
            } else {
              const section = availableSections.find((s) => s.name === sectionName);
              handleSeatInfoSelect({
                sectionId: section?.sectionId,
                seatingId: NONE_SELECT,
              });
            }
          }}
          options={availableSections.map((section) => ({
            label: section.name,
            value: section.name,
          }))}
          placeholder="구역"
          disabled={!seatInfo.floor}
        />

        <SeatDropdown
          value={
            availableSeating.find(
              (seat: SeatWithReviewCount) => seat.seatingId === seatInfo.seatingId,
            )?.name || ''
          }
          onChange={(seatingName) => {
            const seating = availableSeating.find(
              (seat: SeatWithReviewCount) => seat.name === seatingName,
            );
            if (seating) {
              handleSeatInfoSelect({ seatingId: seating.seatingId });
            }
          }}
          options={availableSeating.map((seat) => ({
            label: seat.name,
            value: seat.name,
            disabled: seat.reviewCount === 0,
          }))}
          placeholder="열"
          disabled={seatInfo.floor === FLOOR || seatInfo.sectionId === NONE_SELECT}
        />
      </div>
    </DetailDropdownModal>
  );
};

export default SeatDropdownModal;
