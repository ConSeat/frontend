'use client';

import Badge from '../Badge';
import styles from './AdditionalSeatInfo.module.scss';
import { ADDITIONAL_INFO, REVIEW } from '@/constants/review';
import type { AdditionalInfo, ReviewDispatch } from '@/types/review';

interface AdditionalSeatInfoProps {
  data: Set<AdditionalInfo>;
  dispatch: ReviewDispatch;
}

const NUMBER_OF_LINE = 3;

const splitSeatInfo = () => {
  const result: AdditionalInfo[][] = [];

  for (let i = 0; i < ADDITIONAL_INFO.length; i += NUMBER_OF_LINE) {
    result.push(ADDITIONAL_INFO.slice(i, i + NUMBER_OF_LINE));
  }

  return result;
};

const AdditionalSeatInfo = ({ data, dispatch }: AdditionalSeatInfoProps) => {
  const seatInfoArray = splitSeatInfo();

  const badgeArray = seatInfoArray.map((seatInfo, index) => {
    return (
      <div key={index} className={styles.badgeContainer}>
        {seatInfo.map((info) => {
          const badgeStyle = data.has(info) ? styles.select : styles.badge;

          const handleBadgeClick = () => {
            dispatch({
              type: REVIEW.ACTIONS.ADDITIONAL_INFO_SELECT,
              payload: { additionalInfo: info },
            });
          };

          return (
            <Badge
              key={info}
              text={info}
              onClick={handleBadgeClick}
              backgroundStyle={badgeStyle}
              contentStyle={styles.badgeText}
            />
          );
        })}
      </div>
    );
  });

  return (
    <>
      <div className={styles.additionInfoSection}>{badgeArray}</div>
    </>
  );
};

export default AdditionalSeatInfo;
