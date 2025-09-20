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
      // onLoad={onLoad} 에러떠서 일단 주석 처리
      onReady={() => {
        // 스크립트가 실행 완료된 시점이므로 window.Kakao가 존재합니다.
        if (!window.Kakao?.isInitialized()) {
          // 카카오 개발자 콘솔의 'JavaScript 키'를 사용합니다.
          // https://developers.kakao.com/docs/latest/en/javascript/getting-started
          window.Kakao.init(PUBLIC_ENV.kakaoApiKey!);
        }
      }}
    />
  );
};

export default KakaoScript;
