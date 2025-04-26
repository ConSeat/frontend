'use client';

import Script from 'next/script';
import { PUBLIC_ENV } from '@/config/env';

const KakaoScript = () => {
  const onLoad = () => {
    const Kakao = window.Kakao;
    Kakao.init(PUBLIC_ENV.kakaoApiKey);
  };

  return <Script src="https://developers.kakao.com/sdk/js/kakao.js" async onLoad={onLoad} />;
};

export default KakaoScript;
