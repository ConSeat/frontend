import Badge from '../Badge';
import styles from './AdditionalSeatInfo.module.scss';
import { REVIEW, additionalInfoArray } from '@/constants/review';
import type { AdditionalInfo, ReviewDispatch } from '@/types/review';

interface AdditionalSeatInfoProps {
  additionalInfo: Set<AdditionalInfo> | Set<unknown>;
  dispatch: ReviewDispatch;
}

const NUMBER_OF_LINE = 3;

const splitSeatInfo = () => {
  const result: AdditionalInfo[][] = [];

  for (let i = 0; i < additionalInfoArray.length; i += NUMBER_OF_LINE) {
    result.push(additionalInfoArray.slice(i, i + NUMBER_OF_LINE));
  }

  return result;
};

const AdditionalSeatInfo = ({ additionalInfo, dispatch }: AdditionalSeatInfoProps) => {
  const seatInfoArray = splitSeatInfo();

  const badgeArray = seatInfoArray.map((seatInfo, index) => {
    return (
      <div key={index} className={styles.badgeContainer}>
        {seatInfo.map((info) => {
          const badgeStyle = additionalInfo.has(info) ? styles.select : styles.badge;

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
      <div className={styles.title}>추가 좌석 정보를 선택해주세요</div>
      <div className={styles.description}>
        *플로어의 경우 공연별 변동사항이 많이 발생하여, 해당 정보가 꼭 필요해요
      </div>
      <div className={styles.additionInfoSection}>{badgeArray}</div>
    </>
  );
};

export default AdditionalSeatInfo;
