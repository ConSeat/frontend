'use client';

import styles from './ContactImage.module.scss';
import Image from 'next/image';

const ContactImage = () => {
  return (
    <div className={styles.imageContainer}>
      <Image src="/images/conseat-x.png" alt="문의하기 헤더" width={342} height={246} priority />
    </div>
  );
};

export default ContactImage;
