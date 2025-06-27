import styles from './page.module.scss';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import AnalyticsListener from '@/components/AnalyticsListener/AnalyticsListener';
import ErrorCapture from '@/components/ErrorCapture';
import KakaoScript from '@/components/KakaoScript';
import RefreshLogin from '@/components/RefreshLogin/RefreshLogin';
import SentryUserInitializer from '@/components/SentryUserInitializer/SentryUserInitializer';
import { PUBLIC_ENV } from '@/config/env';
import { AuthProvider } from '@/providers/AuthProvider';
import { ErrorProvider } from '@/providers/ErrorProvider';
import { PopupProvider } from '@/providers/PopupProvider';
import QueryProvider from '@/providers/QueryProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import '@/styles/global.scss';
import { getMetadata } from '@/utils/getMetadata';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
  preload: true,
});

export const metadata: Metadata = getMetadata();

export const viewport: Viewport = {
  themeColor: '#1b1c1e',
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <ErrorProvider>
          <QueryProvider>
            <ToastProvider>
              <PopupProvider>
                <AuthProvider>
                  <ErrorCapture />
                  <RefreshLogin />
                  <SentryUserInitializer />
                  <div className={styles.layout}>
                    {children}
                    <div id="portal"></div>
                  </div>
                </AuthProvider>
              </PopupProvider>
            </ToastProvider>
          </QueryProvider>
        </ErrorProvider>
        <AnalyticsListener />
        <GoogleAnalytics gaId={PUBLIC_ENV.gaId} />
        <KakaoScript />
      </body>
    </html>
  );
};

export default RootLayout;
