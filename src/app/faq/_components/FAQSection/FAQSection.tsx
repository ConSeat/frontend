import styles from './FAQSection.module.scss';
import React, { type ReactNode } from 'react';

interface FAQSectionProps {
  title: string;
  children: ReactNode;
}

const FAQSection = ({ title, children }: FAQSectionProps) => {
  return (
    <div className={styles.faqSection}>
      <div className={styles.faqTitle}>{title}</div>
      <div className={styles.faqItemContainer}>{children}</div>
    </div>
  );
};

export default FAQSection;
