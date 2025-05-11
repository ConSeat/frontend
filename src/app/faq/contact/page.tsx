import ContactHeader from './_components/ContactHeader/ContactHeader';
import ContactImage from './_components/ContactImage/ContactImage';
import ContactText from './_components/ContactText/ContactText';
import React from 'react';
import Spacing from '@/components/Spacing/Spacing';

const page = () => {
  return (
    <>
      <ContactHeader />

      <Spacing size={36} />

      <ContactText />

      <Spacing size={25} />

      <ContactImage />
    </>
  );
};

export default page;
