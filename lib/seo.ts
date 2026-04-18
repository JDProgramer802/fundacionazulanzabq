import { Metadata } from 'next';
import prisma from './prisma';

export async function getSettings() {
  const settings = await prisma.setting.findMany();
  const config: Record<string, any> = {};
  settings.forEach((s) => {
    try {
      config[s.key] = JSON.parse(s.value);
    } catch {
      config[s.key] = s.value;
    }
  });
  return config;
}

export async function generatePageMetadata(
  titleKey: string,
  descriptionKey: string
): Promise<Metadata> {
  const settings = await getSettings();

  const siteTitle = settings.site_title || 'Fundación Azulanza';
  const pageTitle = settings[titleKey] || siteTitle;
  const description = settings[descriptionKey] || settings.global_description;
  const ogImage = settings.og_image || '/og-default.jpg';

  return {
    title: pageTitle,
    description: description,
    openGraph: {
      title: pageTitle,
      description: description,
      images: [ogImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description,
      images: [ogImage],
    },
  };
}
