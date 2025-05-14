'use client';

import Icon from '../Icon/Icon';
import Link from 'next/link';
import React from 'react';

const FAQPageLink = () => {
  return (
    <Link href="/faq">
      <Icon icon="QnA" />
    </Link>
  );
};

export default FAQPageLink;
