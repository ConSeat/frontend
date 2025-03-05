import styles from './SeatRating.module.scss';
import { ChoiceCircle } from '@/assets';
import { REVIEW } from '@/constants/review';
import { ReviewDispatch } from '@/types/review';

interface SeatRatingProps {
  dispatch: ReviewDispatch;
}

const RAITING_VALUE = {
  CLOSE_DIST: '가까워요',
  CLOSE_VIEW: '잘 보여요',
  NORMAL: '보통이에요',
  FAR: '안 보여요',
};

const ratingFactorArray = [
  {
    name: '1',
    title: '본 무대와 거리는 어떤가요?',
    value: [RAITING_VALUE.CLOSE_DIST, RAITING_VALUE.NORMAL, RAITING_VALUE.FAR],
  },
  {
    name: '2',
    title: '돌출 무대와 거리는 어떤가요?',
    value: [RAITING_VALUE.CLOSE_DIST, RAITING_VALUE.NORMAL, RAITING_VALUE.FAR],
  },
  {
    name: '3',
    title: '전광판이 잘 보이나요?',
    value: [RAITING_VALUE.CLOSE_VIEW, RAITING_VALUE.NORMAL, RAITING_VALUE.FAR],
  },
];

const SeatRating = ({ dispatch }: SeatRatingProps) => {
  const handleChageRating = (index: number, value: number) => {
    dispatch({
      type: REVIEW.ACTIONS.RATING_INFO_SELECT,
      payload: { seatRating: { index, value } },
    });
  };

  const ratingContents = ratingFactorArray.map((ratingFactor, factorIdx) => {
    const { name, title, value } = ratingFactor;

    return (
      <div key={name} className={styles.ratingWrapper}>
        <div className={styles.ratingTitle}>{title}</div>
        <div className={styles.radioGroup}>
          {value.map((elem, valueIdx) => {
            return (
              <label key={valueIdx} className={styles.radioLabel}>
                <input
                  type="radio"
                  name={name}
                  value={elem}
                  className={styles.radioInput}
                  onChange={() => {
                    handleChageRating(factorIdx, valueIdx);
                  }}
                />
                <ChoiceCircle className={styles.radioIcon} />
                <div className={styles.radioText}>{elem}</div>
                {valueIdx < value.length - 1 && <div className={styles.radioSplitter} />}
              </label>
            );
          })}
        </div>
      </div>
    );
  });

  return <div className={styles.ratingLayout}>{ratingContents}</div>;
};

export default SeatRating;
