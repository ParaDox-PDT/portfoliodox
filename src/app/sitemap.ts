// ===========================================
// SITEMAP GENERATOR
// ===========================================
// Qidiruv tizimlari uchun sitemap.xml generatsiya qiladi

import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo.config';

// Statik sahifalar
const staticPages = [
  {
    url: '',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  },
  {
    url: '/about',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.95, // High priority for SEO - contains all aliases and personal info
  },
  {
    url: '/projects',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
];

// Loyihalar (dinamik) - keyinchalik Firebase dan olish mumkin
const projectSlugs = [
  'fintrack-pro',
  'healthmate',
  'taskflow',
  'flutter-starter-kit',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  // Statik sahifalar
  const staticRoutes = staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
  
  // Loyiha sahifalari
  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  
  return [...staticRoutes, ...projectRoutes];
}
