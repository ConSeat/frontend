'use client';

import type { FilterAction } from '../../_types/filter';
import AllCheckbox from '../AllCheckbox/AllCheckbox';
import DetailDropdownModal from '../AllDropdownModal/AllDropdownModal';
import styles from './FeatureDropdownModal.module.scss';
import { useState } from 'react';
import { useFetchStadiumFeatures } from '@/hooks/queries/useFetchStadium';

interface FeatureDropdownModalProps {
  features: number[];
  dispatch: React.Dispatch<FilterAction>;
}

const FeatureDropdownModal = ({ features, dispatch }: FeatureDropdownModalProps) => {
  const [tempFeatures, setTempFeatures] = useState<number[]>(features);
  const { data: featuresData } = useFetchStadiumFeatures();

  const handleResetButton = () => {
    setTempFeatures([]);
  };

  const handleConfirmButton = () => {
    dispatch({
      type: 'FEATURES',
      payload: { features: tempFeatures },
    });
  };

  const handleToggle = (id: number) => {
    setTempFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  return (
    <DetailDropdownModal
      label={`특이사항 ${features.length > 0 ? features.length : ''}`}
      isSelected={features.length > 0}
      title="특이사항"
      onReset={handleResetButton}
      onConfirm={handleConfirmButton}
    >
      <div className={styles.modalContentContainer}>
        {featuresData?.data.features.map((info) => (
          <AllCheckbox
            key={info.featureId}
            text={info.name}
            onClick={() => handleToggle(info.featureId)}
            isSelected={tempFeatures.includes(info.featureId)}
          />
        ))}
      </div>
    </DetailDropdownModal>
  );
};

export default FeatureDropdownModal;
