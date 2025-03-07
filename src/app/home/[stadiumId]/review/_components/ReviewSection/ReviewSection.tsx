import styles from './ReviewSection.module.scss';
import { ReactNode } from 'react';

const ReviewSection = ({ children }: { children: ReactNode }) => {
  return <section className={styles.reviewSection}>{children}</section>;
};

const ReviewSectionTitle = ({ title, subtitle }: { title?: string; subtitle?: string }) => {
  return (
    <div className={styles.reviewSectionTitleWrapper}>
      {title && <h2 className={styles.reviewSectionTitle}>{title}</h2>}
      {subtitle && <p className={styles.reviewSectionSubtitle}>{subtitle}</p>}
    </div>
  );
};

ReviewSection.Title = ReviewSectionTitle;

export default ReviewSection;
