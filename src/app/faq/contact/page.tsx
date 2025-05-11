import ContactHeader from './_components/ContactHeader/ContactHeader';
import ContactImage from './_components/ContactImage/ContactImage';
import ContactText from './_components/ContactText/ContactText';
import GoToOfficialButton from './_components/GoToOfficialButton/GoToOfficialButton';
import styles from './page.module.scss';
import React from 'react';
import Spacing from '@/components/Spacing/Spacing';

const page = () => {
  return (
    <div className={styles.contactContainer}>
      <ContactHeader />

      <Spacing size={36} />

      <ContactText />

      <Spacing size={25} />

      <ContactImage />

      <Spacing size={50} />

      <div className={styles.officialButtonContainer}>
        <GoToOfficialButton />
      </div>
    </div>
  );
};

export default page;
