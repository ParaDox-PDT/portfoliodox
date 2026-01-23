// ===========================================
// ROBOTS.TXT GENERATOR
// ===========================================
// Qidiruv tizimlari uchun robots.txt generatsiya qiladi

import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo.config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
      // Google bot uchun maxsus qoidalar
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // Bing bot uchun
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      // AI crawlers uchun ruxsat (ChatGPT, Perplexity, etc.)
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
