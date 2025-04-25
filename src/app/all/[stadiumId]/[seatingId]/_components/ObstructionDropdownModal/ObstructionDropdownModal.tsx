'use client';

import AllCheckbox from '../AllCheckbox/AllCheckbox';
import DetailDropdownModal from '../AllDropdownModal/AllDropdownModal';
import type { FilterAction } from '../AllReviewContainer/AllReviewContainer';
import styles from './ObstructionDropdownModal.module.scss';
import { useState } from 'react';
import { useFetchStadiumObstructions } from '@/hooks/queries/useFetchStadium';

interface ObstructionDropdownModalProps {
  obstructions: number[];
  dispatch: React.Dispatch<FilterAction>;
}

const ObstructionDropdownModal = ({ obstructions, dispatch }: ObstructionDropdownModalProps) => {
  const [tempObstructions, setTempObstructions] = useState<number[]>(obstructions);
  const { data: obstructionsData } = useFetchStadiumObstructions();

  const handleResetButton = () => {
    setTempObstructions([]);
  };

  const handleConfirmButton = () => {
    dispatch({
      type: 'OBSTRUCTIONS',
      payload: { obstructions: tempObstructions },
    });
  };

  const handleToggle = (id: number) => {
    setTempObstructions((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  return (
    <DetailDropdownModal
      label={`시야방해 ${obstructions.length > 0 ? obstructions.length : ''}`}
      isSelected={obstructions.length > 0}
      title="시야방해"
      onReset={handleResetButton}
      onConfirm={handleConfirmButton}
    >
      <div className={styles.modalContentContainer}>
        {obstructionsData?.data.obstructions.map((info) => (
          <AllCheckbox
            key={info.obstructionId}
            text={info.name}
            onClick={() => handleToggle(info.obstructionId)}
            isSelected={tempObstructions.includes(info.obstructionId)}
          />
        ))}
      </div>
    </DetailDropdownModal>
  );
};

export default ObstructionDropdownModal;
