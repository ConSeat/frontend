import FAQHeader from './_components/FAQHeader/FAQHeader';
import FAQSection from './_components/FAQSection/FAQSection';
import styles from './page.module.scss';
import React from 'react';
import Spacing from '@/components/Spacing/Spacing';

const FAQPage = () => {
  return (
    <>
      <FAQHeader />

      <Spacing size={45} />

      <div className={styles.faqContainer}>
        <FAQSection title="검색">
          <div>검색 결과에 문제 있어요</div>
        </FAQSection>
      </div>
    </>
  );
};

export default FAQPage;
