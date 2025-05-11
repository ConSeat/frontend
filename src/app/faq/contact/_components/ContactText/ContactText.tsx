import styles from './ContactText.module.scss';
import React from 'react';

const Content = () => {
  return (
    <p className={styles.contactTextContent}>
      콘시트가 더 좋은 서비스가 될 수 있도록 의견이나 제안을 편하게 말씀해주세요. 소중한 의견들은
      서비스 개선에 꼭 참고하도록 하겠습니다.
      <br />
      <br />
      <div className={styles.plus}>
        <div className={styles.plusContent}>
          X의 ‘콘시트 공식계정’을 통해
          <span className={styles.highlight}>[1:1 문의하기]</span>를 이용해주세요.
        </div>
      </div>
      <div className={styles.plus}>
        <div className={styles.plusContent}>
          보내주신 의견에 대해 추가적인 안내가 필요한 경우 등록된 메일 계정으로 연락이 갈 수
          있습니다.
        </div>
      </div>
    </p>
  );
};

const ContactText = () => {
  return (
    <div className={styles.contactTextContainer}>
      <div className={styles.contactTextTitle}>문의가 필요하신가요?</div>
      <Content />
    </div>
  );
};

export default ContactText;
