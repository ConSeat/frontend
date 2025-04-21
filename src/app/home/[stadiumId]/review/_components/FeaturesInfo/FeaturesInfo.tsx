'use client';

import { REVIEW } from '../../_constants/review';
import ReviewCheckbox from '../ReviewCheckbox';
import styles from './FeaturesInfo.module.scss';
import React from 'react';
import { useFetchStadiumFeatures } from '@/hooks/queries/useFetchStadium';
import type { ReviewDispatch } from '@/types/review';

interface FeaturesInfoProps {
  data: number[];
  dispatch: ReviewDispatch;
}

const FeaturesInfo = ({ data, dispatch }: FeaturesInfoProps) => {
  const { data: features } = useFetchStadiumFeatures();
  const fetchedFeatures = [...(features?.data.features ?? []), { featureId: -1, name: '없음' }];

  const toggleFeaturesInfo = (featureId: number) => {
    dispatch({
      type: REVIEW.ACTIONS.FEATURES_INFO_SELECT,
      payload: { feature: featureId },
    });
  };

  return (
    <div className={styles.featuresInfoSection}>
      {fetchedFeatures.map((info) => (
        <ReviewCheckbox
          key={info.featureId}
          text={info.name}
          onClick={() => toggleFeaturesInfo(info.featureId)}
          isSelected={data.includes(info.featureId)}
        />
      ))}
    </div>
  );
};

export default React.memo(FeaturesInfo);
