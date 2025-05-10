'use client';

import styles from './ContactSection.module.scss';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '@/components/Button/Button';

const ContactSection = () => {
  const router = useRouter();

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactTitle}>🔍 찾고있는 내용이 없나요?</div>
      <div className={styles.contactButton}>
        <Button onClick={() => router.push('/faq/contact')}>문의하기</Button>
      </div>
    </div>
  );
};

export default ContactSection;
