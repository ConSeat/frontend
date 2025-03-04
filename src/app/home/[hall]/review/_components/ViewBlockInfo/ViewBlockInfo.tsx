'use client';

import Badge from '../Badge';
import styles from './ViewBlockInfo.module.scss';
import { REVIEW, VIEW_BLOCK_INFO } from '@/constants/review';
import type { ReviewDispatch, ViewBlockInfo } from '@/types/review';

interface ViewBlockInfoBannerProps {
  viewBlockInfo: Set<ViewBlockInfo>;
  dispatch: ReviewDispatch;
}

const splitNum = [1, 2, 2];

const ViewBlockInfoBanner = ({ viewBlockInfo, dispatch }: ViewBlockInfoBannerProps) => {
  let idx = 0;
  const parts = splitNum.map((number) => {
    const result = VIEW_BLOCK_INFO.slice(idx, idx + number);
    idx += number;

    return result;
  });

  return (
    <>
      <div className={styles.viewBlockInfoSection}>
        {parts.map((part, index) => {
          return (
            <div key={index} className={styles.badgeContainer}>
              {part.map((info) => {
                const handleClickBadge = () => {
                  dispatch({
                    type: REVIEW.ACTIONS.VIEW_BLOCK_SELECT,
                    payload: { viewBlockInfo: info },
                  });
                };

                return (
                  <Badge
                    key={info}
                    text={info}
                    onClick={handleClickBadge}
                    isSelected={viewBlockInfo.has(info)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ViewBlockInfoBanner;
