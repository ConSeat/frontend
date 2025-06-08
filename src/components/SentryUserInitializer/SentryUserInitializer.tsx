'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect, useState } from 'react';
import { getMemberInfo } from '@/apis/members/member.api';

const SentryUserInitializer = () => {
  const [called, setCalled] = useState(false);

  useEffect(() => {
    if (called) return;
    setCalled(true);

    const fetchAndSetUser = async () => {
      try {
        const memberInfo = await getMemberInfo();
        Sentry.setUser({
          id: memberInfo.email,
          username: memberInfo.nickname,
          email: memberInfo.email,
        });
      } catch {
        Sentry.setUser(null);
      }
    };

    fetchAndSetUser();
  }, [called]);

  return null;
};

export default SentryUserInitializer;
