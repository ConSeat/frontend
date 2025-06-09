export const GA_TRACKING_ID = 'G-3DM8X82SXT';

export const pageview = (url: string) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    console.warn('window.gtag is not ready yet');
    return;
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
