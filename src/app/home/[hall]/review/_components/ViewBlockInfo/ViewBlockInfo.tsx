import Badge from '../Badge';
import styles from './ViewBlockInfo.module.scss';
import { REVIEW, viewBlockInfoArray } from '@/constants/review';
import type { ReviewDispatch, ViewBlockInfo } from '@/types/review';

interface ViewBlockInfoBannerProps {
  viewBlockInfo: Set<ViewBlockInfo> | Set<unknown>;
  dispatch: ReviewDispatch;
}

const splitNum = [1, 2, 2];

const ViewBlockInfoBanner = ({ viewBlockInfo, dispatch }: ViewBlockInfoBannerProps) => {
  let idx = 0;
  const parts = splitNum.map((number) => {
    const result = viewBlockInfoArray.slice(idx, idx + number);
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

                const style = viewBlockInfo.has(info) ? styles.select : styles.badge;

                return (
                  <Badge
                    key={info}
                    backgroundStyle={style}
                    contentStyle={styles.badgeText}
                    text={info}
                    onClick={handleClickBadge}
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
