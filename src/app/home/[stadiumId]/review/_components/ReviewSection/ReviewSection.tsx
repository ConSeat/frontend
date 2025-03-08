import styles from './ReviewSection.module.scss';
import React, { ReactNode } from 'react';

const ReviewSectionComponent = React.memo(({ children }: { children: ReactNode }) => {
  return <section className={styles.reviewSection}>{children}</section>;
});

const Title = React.memo(({ title, subtitle }: { title?: string; subtitle?: string }) => {
  return (
    <div className={styles.reviewSectionTitleWrapper}>
      {title && <h2 className={styles.reviewSectionTitle}>{title}</h2>}
      {subtitle && <p className={styles.reviewSectionSubtitle}>{subtitle}</p>}
    </div>
  );
});

ReviewSectionComponent.displayName = 'ReviewSection';
Title.displayName = 'ReviewSectionTitle';

const ReviewSection = Object.assign(ReviewSectionComponent, { Title });

export default ReviewSection;
