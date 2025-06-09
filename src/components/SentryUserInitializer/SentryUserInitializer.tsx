'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect, useState } from 'react';

const SentryUserInitializer = () => {
  const [called, setCalled] = useState(false);

  useEffect(() => {
    if (called) return;
    setCalled(true);

    const localUser = localStorage.getItem('memberInfo');
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      Sentry.setUser({
        id: parsedUser.email,
        username: parsedUser.nickname,
        email: parsedUser.email,
      });
      return;
    }
  }, [called]);

  return null;
};

export default SentryUserInitializer;
