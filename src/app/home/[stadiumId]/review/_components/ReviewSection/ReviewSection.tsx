import styles from './ReviewSection.module.scss';
import classNames from 'classnames';
import React, { type ReactNode } from 'react';

interface ReviewSectionProps {
  children: ReactNode;
  ref?: React.Ref<HTMLDivElement> | null;
  isInvalid?: boolean;
}

const ReviewSection = ({ children, ref, isInvalid = false }: ReviewSectionProps) => {
  return (
    <section
      className={classNames(styles.reviewSection, {
        [styles.error]: isInvalid,
      })}
      ref={ref}
    >
      {children}
    </section>
  );
};

const ReviewSectionTitle = ({
  title,
  subtitle,
}: {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
}) => {
  return (
    <div className={styles.reviewSectionTitleWrapper}>
      {title && <h2 className={styles.reviewSectionTitle}>{title}</h2>}
      {subtitle && <p className={styles.reviewSectionSubtitle}>{subtitle}</p>}
    </div>
  );
};

ReviewSection.Title = React.memo(ReviewSectionTitle);

export default ReviewSection;
