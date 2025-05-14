import ContactSection from './_components/ContactSection/ContactSection';
import FAQDropdown, {
  AnswerBold,
  AnswerMail,
  AnswerOfficialLink,
} from './_components/FAQDropdown/FAQDropdown';
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
            question="Q. 원하는 구역 검색이 안돼요"
            answer={
              <>
                A. 아직 해당 구역에 등록된 후기가 없는 경우, 검색 결과가 표시되지 않을 수 있습니다.
                <br />
                다른 구역을 선택해보시거나, 직접 후기를 등록해 주시면 다른 사용자에게도 도움이 될
                거예요.
              </>
            }
          />
        </FAQSection>

        <Splitter />

        <FAQSection title="후기등록">
          <FAQDropdown
            question="Q. 등록한 후기를 삭제하고 싶어요"
            answer={
              <>
                A. 현재 버전에서는 후기 수정 및 삭제 기능이 제공되지 않습니다.
                <br />
                삭제를 원하실 경우, <AnswerMail /> 또는 <AnswerOfficialLink /> 로 문의해 주세요
              </>
            }
          />
          <FAQDropdown
            question="Q. 등록한 후기가 반려되었어요"
            answer={
              <>
                A. 현재는 후기를 수정하거나 삭제하는 기능이 제공되지 않습니다.
                <br />
                반려 사유를 확인하신 후, <AnswerBold>새로운 후기로 다시 등록</AnswerBold>해 주세요.
              </>
            }
          />
          <FAQDropdown
            question="Q. 제가 다녀온 콘서트가 없어요"
            answer={
              <>
                A. 현재는 <AnswerBold>체조경기장 리모델링 이후(2019년~)</AnswerBold> 콘서트만
                선택하실 수 있습니다.
                <br />
                원하시는 콘서트가 목록에 없다면, <AnswerMail /> 또는 <AnswerOfficialLink /> 로
                문의해 주세요.
              </>
            }
          />
          <FAQDropdown
            question="Q. 플로어 구역 이름이 달라서 어떤 구역을 선택해야 할지 모르겠어요"
            answer={
              <>
                A. 플로어 구역은 콘서트 구성에 따라{' '}
                <AnswerBold>구역 이름이 다를 수 있습니다.</AnswerBold> <br />
                제공된 좌석표를 참고하시고,{' '}
                <AnswerBold>본무대나 돌출 무대를 기준으로 좌우 방향</AnswerBold>을 확인해 선택해
                주세요.
              </>
            }
          />
        </FAQSection>

        <Splitter />

        <FAQSection title="관리">
          <FAQDropdown
            question="Q. 제가 등록한 후기가 상업적으로 이용되나요?"
            answer={
              <>
                A. 본 서비스는 <AnswerBold>광고나 수익 목적 없이</AnswerBold>, 사용자 간의 정보
                공유를 위해 운영됩니다.
                <br />
                등록된 후기는 상업적으로 이용되지 않으며, 개인정보와 콘텐츠 저작권도 안전하게
                보호됩니다.
              </>
            }
          />
          <FAQDropdown
            question="Q. 후기 이미지를 외부로 공유할 수 있나요?"
            answer={
              <>
                A. 후기 검색 결과는 <AnswerBold>링크를 통해 외부 공유</AnswerBold>하실 수 있습니다.
                <br />
                단, 해당 후기는 서비스 내에서만 확인 가능하며, 운영자가 내부 가이드라인에 따라
                검수한 후 안전하게 등록된 콘텐츠 입니다.
              </>
            }
          />
          <FAQDropdown
            question="Q. 등록한 후기는 어디에서 볼 수 있나요?"
            answer={<>A. 마이페이지의 ‘내 후기’ 에서 직접 등록한 후기를 확인하실 수 있습니다.</>}
          />
        </FAQSection>

        <Splitter />

        <ContactSection />

        <Spacing size={45} />
      </div>
    </>
  );
};

export default FAQPage;
