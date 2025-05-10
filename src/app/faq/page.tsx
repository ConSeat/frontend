import FAQDropdown from './_components/FAQDropdown/FAQDropdown';
import FAQHeader from './_components/FAQHeader/FAQHeader';
import FAQSection from './_components/FAQSection/FAQSection';
import styles from './page.module.scss';
import React from 'react';
import Spacing from '@/components/Spacing/Spacing';
import Splitter from '@/components/Splitter/Splitter';

const FAQPage = () => {
  return (
    <>
      <FAQHeader />

      <Spacing size={45} />

      <div className={styles.faqContainer}>
        <FAQSection title="검색">
          <FAQDropdown
            title="🚨 검색 결과에 문제가 있어요"
            content="A. 아직 해당 구역에 등록된 후기가 없는 경우, 검색 결과가 표시되지 않을 수 있습니다. 다른 구역을 선택해보시거나, 직접 후기를 등록해 주시면 다른 사용자에게도 도움이 될 거예요."
          />
        </FAQSection>

        <FAQSection title="후기등록">
          <FAQDropdown title="🗑️ 직접 등록한 후기를 삭제하고 싶어요" content="답변" />
          <FAQDropdown title="🤔 등록한 후기가 반려되었어요" content="답변" />
        </FAQSection>

        <Splitter />

        <FAQSection title="관리">
          <FAQDropdown title="🙇🏻‍♀️ 회원탈퇴를 진행하고 싶어요" content="답변" />
        </FAQSection>

        <Splitter />
      </div>
    </>
  );
};

export default FAQPage;
