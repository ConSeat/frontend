'use client';

import styles from './ContactSection.module.scss';
import React from 'react';
import Button from '@/components/Button/Button';
import { usePopup } from '@/providers/PopupProvider';

const ContactSection = () => {
  const { showPopup } = usePopup();

  const handleContactButton = () => {
    showPopup({
      title: '📮 문의하기',
      subtitle: '궁금하신 사항은 X(트위터)로 문의해주세요',
      onConfirm: () => {
        window.open(
          'https://x.com/messages/1568567420574662658-1914300317010968576',
          '_blank',
          'noopener,noreferrer',
        );
      },
    });
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactTitle}>🔍 찾고있는 내용이 없나요?</div>
      <div className={styles.contactButton}>
        <Button onClick={handleContactButton}>문의하기</Button>
      </div>
    </div>
  );
};

export default ContactSection;
