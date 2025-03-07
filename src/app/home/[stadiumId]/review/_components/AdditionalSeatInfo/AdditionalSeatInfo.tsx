'use client';

import Badge from '../Badge';
import styles from './AdditionalSeatInfo.module.scss';
import { ADDITIONAL_INFO, REVIEW } from '@/constants/review';
import type { AdditionalInfo, ReviewDispatch } from '@/types/review';

interface AdditionalSeatInfoProps {
  data: Set<AdditionalInfo>;
  dispatch: ReviewDispatch;
}

const AdditionalSeatInfo = ({ data, dispatch }: AdditionalSeatInfoProps) => {
  const toggleAdditionalInfo = (info: AdditionalInfo) => {
    dispatch({
      type: REVIEW.ACTIONS.ADDITIONAL_INFO_SELECT,
      payload: { additionalInfo: info },
    });
  };

  return (
    <div className={styles.additionInfoSection}>
      {ADDITIONAL_INFO.map((seatInfo) => (
        <Badge
          key={seatInfo}
          text={seatInfo}
          onClick={() => toggleAdditionalInfo(seatInfo)}
          isSelected={data.has(seatInfo)}
        />
      ))}
    </div>
  );
};

export default AdditionalSeatInfo;
