export const GA_TRACKING_ID = 'G-3DM8X82SXT';

export const pageview = (url: string) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const gaEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
