// ===========================================
// ROOT LAYOUT
// ===========================================

import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

// SEO Components
import { JsonLd, FaqJsonLd } from '@/components/seo/JsonLd';
import { siteConfig, seoMeta, personData } from '@/lib/seo.config';

// ===========================================
// METADATA - SEO OPTIMIZED
// ===========================================

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  
  // Titles
  title: {
    default: seoMeta.home.title,
    template: '%s | ParaDox Portfolio',
  },
  
  // Description - includes all aliases for AI discoverability
  description: seoMeta.home.description,
  
  // Keywords - includes name variations and aliases
  keywords: seoMeta.home.keywords,
  
  // Authors
  authors: [
    { name: personData.name },
    { name: 'ParaDox' },
    { name: 'ParaDox-PDT' },
  ],
  creator: personData.name,
  publisher: personData.name,
  
  // Canonical URL
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en-US': siteConfig.url,
      'uz-UZ': `${siteConfig.url}/uz`,
    },
  },
  
  // Icons
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // Open Graph - for social sharing
  openGraph: {
    type: 'profile',
    locale: siteConfig.locale,
    siteName: siteConfig.siteName,
    title: seoMeta.home.title,
    description: seoMeta.home.description,
    url: siteConfig.url,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${personData.name} - ParaDox Portfolio`,
      },
    ],
    // Profile specific
    firstName: 'Doniyor',
    lastName: "Jo'rabekov",
    username: 'ParaDox-PDT',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: seoMeta.home.title,
    description: seoMeta.home.description,
    images: ['/og-image.png'],
    creator: '@ParaDox_PDT',
    site: '@ParaDox_PDT',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
    },
  },
  
  // Verification tags (add your actual IDs when you have them)
  verification: {
    google: 'your-google-verification-code', // Google Search Console
    yandex: 'your-yandex-verification-code', // Yandex Webmaster
    // bing: 'your-bing-verification-code',  // Bing Webmaster
  },
  
  // Category
  category: 'technology',
  
  // Other metadata
  other: {
    // AI-specific meta tags
    'ai-description': personData.description,
    'profile:username': 'ParaDox-PDT',
    
    // Dublin Core metadata
    'DC.title': seoMeta.home.title,
    'DC.creator': personData.name,
    'DC.subject': 'Flutter Development, Mobile App Development',
    'DC.description': personData.description,
    
    // Additional SEO
    'revisit-after': '7 days',
    'rating': 'General',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
};

// ===========================================
// LAYOUT COMPONENT
// ===========================================

import { IntroLoader } from '@/components/IntroLoader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* JSON-LD Structured Data for SEO and AI */}
        <JsonLd type="full" />
        <FaqJsonLd />
        
        {/* Additional meta tags for AI discoverability */}
        <meta name="author" content="Doniyor Jo'rabekov (ParaDox)" />
        <meta name="subject" content="Flutter Developer Portfolio" />
        
        {/* Geo tags */}
        <meta name="geo.region" content="UZ" />
        <meta name="geo.placename" content="Tashkent, Uzbekistan" />
        
        {/* Link tags */}
        <link rel="author" href={siteConfig.url} />
        <link rel="me" href="https://github.com/ParaDox-PDT" />
        <link rel="me" href="https://t.me/ParaDox_PDT" />
      </head>
      <body className="antialiased">
        {/* Intro Loader - Client Component */}
        <IntroLoader />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--color-bg-card)',
              color: 'var(--color-text)',
              borderRadius: '0.75rem',
              border: '1px solid var(--color-border)',
            },
          }}
        />
      </body>
    </html>
  );
}

