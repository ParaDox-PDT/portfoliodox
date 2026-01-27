import { getProjects } from '@/lib/firestore';
import { mockProjects } from '@/lib/mockData';
import { siteConfig } from '@/lib/seo.config';
import { MetadataRoute } from 'next';

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // 1. Statik sahifalar
  const staticRoutes = staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // 2. Loyiha sahifalari (Dinamik Firebase'dan)
  let projectSlugs: string[] = [];

  try {
    const { data, error } = await getProjects();

    if (data && data.length > 0) {
      projectSlugs = data.map(p => p.slug);
    } else {
      // Firebase'da ma'lumot bo'lmasa yoki xato bo'lsa, mock ma'lumotlardan foydalanamiz
      // Bu build jarayonida sitemap bo'sh qolmasligini ta'minlaydi
      console.warn('Sitemap: No projects found in Firebase, falling back to mock data');
      projectSlugs = mockProjects.map(p => p.slug);
    }
  } catch (error) {
    console.error('Sitemap generation error:', error);
    projectSlugs = mockProjects.map(p => p.slug);
  }

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
