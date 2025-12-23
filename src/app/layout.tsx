// ===========================================
// ROOT LAYOUT
// ===========================================

import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

// ===========================================
// METADATA
// ===========================================

export const metadata: Metadata = {
  title: {
    default: 'Flutter Developer | Mobile App Specialist',
    template: '%s | Flutter Developer Portfolio',
  },
  description: 'Professional Flutter Developer with 3+ years of experience building production-ready mobile applications. Specializing in clean architecture, beautiful UIs, and seamless user experiences.',
  keywords: [
    'Flutter Developer',
    'Mobile App Developer',
    'Dart',
    'iOS',
    'Android',
    'Cross-platform',
    'Mobile Development',
    'Clean Architecture',
    'BLoC Pattern',
  ],
  authors: [{ name: 'Flutter Developer' }],
  creator: 'Flutter Developer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Flutter Developer Portfolio',
    title: 'Flutter Developer | Mobile App Specialist',
    description: 'Professional Flutter Developer with 3+ years of experience building production-ready mobile applications.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flutter Developer | Mobile App Specialist',
    description: 'Professional Flutter Developer with 3+ years of experience building production-ready mobile applications.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
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

