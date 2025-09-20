'use client';

import Script from 'next/script';
import { PUBLIC_ENV } from '@/config/env';

const KakaoScript = () => {
  const onLoad = () => {
    try {
      const Kakao = (window as any).Kakao;
      if (!Kakao) {
        console.warn('Kakao SDK not loaded yet');
        return;
      }

      if (!Kakao.isInitialized()) {
        if (!PUBLIC_ENV.kakaoApiKey) {
          console.error('Kakao API key is missing');
          return;
        }
        Kakao.init(PUBLIC_ENV.kakaoApiKey);
        console.info('Kakao SDK initialized');
      }
    } catch (err) {
      console.error('Kakao initialization error:', err);
    }
  };

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      strategy="afterInteractive"
      onLoad={onLoad}
    />
  );
};

export default KakaoScript;
