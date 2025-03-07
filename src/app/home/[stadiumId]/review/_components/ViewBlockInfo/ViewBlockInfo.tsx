'use client';

import Badge from '../Badge';
import styles from './ViewBlockInfo.module.scss';
import { REVIEW, VIEW_BLOCK_INFO } from '@/constants/review';
import type { ReviewDispatch, ViewBlockInfo } from '@/types/review';

interface ViewBlockInfoProps {
  data: Set<ViewBlockInfo>;
  dispatch: ReviewDispatch;
}

const ViewBlockInfo = ({ data, dispatch }: ViewBlockInfoProps) => {
  const toggleViewBlockInfo = (info: ViewBlockInfo) => {
    dispatch({
      type: REVIEW.ACTIONS.VIEW_BLOCK_SELECT,
      payload: { viewBlockInfo: info },
    });
  };

  return (
    <div className={styles.viewBlockInfoSection}>
      {VIEW_BLOCK_INFO.map((viewInfo) => (
        <Badge
          key={viewInfo}
          text={viewInfo}
          onClick={() => toggleViewBlockInfo(viewInfo)}
          variant="dark"
          isSelected={data.has(viewInfo)}
        />
      ))}
    </div>
  );
};

export default ViewBlockInfo;
