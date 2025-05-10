import styles from './ContactSection.module.scss';
import React from 'react';
import Button from '@/components/Button/Button';

const ContactSection = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactTitle}>🔍 찾고있는 내용이 없나요?</div>
      <div className={styles.contactButton}>
        <Button>문의하기</Button>
      </div>
    </div>
  );
};

export default ContactSection;
