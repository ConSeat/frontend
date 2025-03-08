'use client';

import Badge from '../Badge';
import styles from './FeaturesInfo.module.scss';
import { FEATURES_INFO, REVIEW } from '@/constants/review';
import type { ReviewDispatch } from '@/types/review';

interface FeaturesInfoProps {
  data: number[];
  dispatch: ReviewDispatch;
}

const FeaturesInfo = ({ data, dispatch }: FeaturesInfoProps) => {
  const toggleFeaturesInfo = (info: number) => {
    dispatch({
      type: REVIEW.ACTIONS.FEATURES_INFO_SELECT,
      payload: { feature: info },
    });
  };

  return (
    <div className={styles.featuresInfoSection}>
      {FEATURES_INFO.map((info) => (
        <Badge
          key={info.featureId}
          text={info.name}
          onClick={() => toggleFeaturesInfo(info.featureId)}
          isSelected={data.includes(info.featureId)}
        />
      ))}
    </div>
  );
};

export default FeaturesInfo;
