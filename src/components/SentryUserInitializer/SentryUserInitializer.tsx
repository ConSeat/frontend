'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { useFetchMemberInfo } from '@/hooks/queries/useFetchMember';

const SentryUserInitializer = () => {
  const { data: memberInfo } = useFetchMemberInfo();

  useEffect(() => {
    if (memberInfo) {
      Sentry.setUser({
        id: memberInfo.email,
        username: memberInfo.nickname,
        email: memberInfo.email,
      });
    }
  }, [memberInfo]);

  return null;
};

export default SentryUserInitializer;
