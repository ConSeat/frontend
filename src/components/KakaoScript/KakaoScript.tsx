'use client';

import Script from 'next/script';
import { PUBLIC_ENV } from '@/config/env';

const KakaoScript = () => {
  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      strategy="afterInteractive"
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
