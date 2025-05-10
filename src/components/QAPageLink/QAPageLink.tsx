'use client';

import Icon from '../Icon/Icon';
import Link from 'next/link';
import React from 'react';

const QAPageLink = () => {
  return (
    <Link href="/qapage">
      <Icon icon="QnA" />
    </Link>
  );
};

export default QAPageLink;
