import styles from './page.module.scss';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import ErrorCapture from '@/components/ErrorCapture';
import KakaoScript from '@/components/KakaoScript';
import { auth } from '@/auth';
import { PUBLIC_ENV } from '@/config/env';
import { AuthProvider } from '@/providers/AuthProvider';
import { ErrorProvider } from '@/providers/ErrorProvider';
import { PopupProvider } from '@/providers/PopupProvider';
import QueryProvider from '@/providers/QueryProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import '@/styles/global.scss';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: PUBLIC_ENV.siteUrl ? new URL(PUBLIC_ENV.siteUrl) : undefined,
  title: 'CON:SEAT - See it before you Sit',
  description: '한눈에 확인하는 콘서트장 시야',
  openGraph: {
    type: 'website',
    url: PUBLIC_ENV.siteUrl,
    title: 'CON:SEAT - See it before you Sit',
    description: '한눈에 확인하는 콘서트장 시야',
    siteName: 'CON:SEAT',
    locale: 'ko_KR',
    images: [
      {
        url: '/og/main-og.svg',
        width: 1200,
        height: 630,
        alt: 'CON:SEAT preview image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CON:SEAT - See it before you Sit',
    description: '한눈에 확인하는 콘서트장 시야',
    creator: '@con_see_at',
    images: [PUBLIC_ENV.siteUrl + '/og/main-og.svg'],
  },
  icons: {
    icon: '/logo/main-mark.svg',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();

  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <ErrorProvider>
          <QueryProvider>
            <ToastProvider>
              <PopupProvider>
                <AuthProvider session={session}>
                  <ErrorCapture />
                  <div className={styles.layout}>
                    {children}
                    <div id="portal"></div>
                  </div>
                </AuthProvider>
              </PopupProvider>
            </ToastProvider>
          </QueryProvider>
        </ErrorProvider>
      </body>
      <KakaoScript />
    </html>
  );
};

export default RootLayout;
