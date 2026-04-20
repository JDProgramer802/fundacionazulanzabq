import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fundacionazulanzabq.org';

  // Fetch all published news slugs
  const news = await prisma.news.findMany({
    where: { published: true },
    select: { slug: true, updated_at: true },
  });

  const newsUrls = news.map((item) => ({
    url: `${baseUrl}/noticias/${item.slug}`,
    lastModified: item.updated_at,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const staticUrls = [
    '',
    '/nosotros',
    '/noticias',
    '/galeria',
    '/asesoria',
    '/donaciones',
    '/voluntariado',
    '/preguntas',
    '/contacto',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticUrls, ...newsUrls];
}
