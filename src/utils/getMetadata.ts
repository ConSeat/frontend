import type { Metadata } from 'next';
import { META } from '@/constants/metadata';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  asPath?: string;
  ogImage?: string;
}

export const getMetadata = (metadataProps?: GenerateMetadataProps) => {
  const { title, description, asPath, ogImage } = metadataProps || {};

  const TITLE = title ? `${title} | 콘시트` : META.title;
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath ? asPath : META.url;
  const OG_IMAGE = ogImage || META.ogImage;

  const metadata: Metadata = {
    metadataBase: new URL(META.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...META.keyword],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: TITLE,
      locale: 'ko_KR',
      type: 'website',
      url: PAGE_URL,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: TITLE,
        },
      ],
    },
    verification: {
      google: META.googleVerification,
    },
    twitter: {
      card: 'summary_large_image',
      site: META.twitterSite,
      creator: META.twitterCreator,
      title: TITLE,
      description: DESCRIPTION,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: TITLE,
        },
      ],
    },
    appleWebApp: {
      capable: true,
      title: META.shortName,
      statusBarStyle: 'default',
    },
  };

  return metadata;
};
