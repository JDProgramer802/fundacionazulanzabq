import HomeClient from '@/components/public/HomeClient';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fundación Azulanza BQ | Salud Mental y Apoyo Comunitario en Barranquilla',
  description:
    'Fundación Azulanza BQ brinda asistencia integral en salud mental, seguridad alimentaria y desarrollo comunitario en Barranquilla. Transformando el dolor en esperanza.',
  openGraph: {
    title: 'Fundación Azulanza BQ | Salud Mental y Apoyo Comunitario',
    description:
      'Brindamos asistencia integral en salud mental y desarrollo comunitario en Barranquilla.',
    images: ['/logo.png'],
  },
};

async function getHomeData() {
  const [settings, testimonials, events, gallery] = await Promise.all([
    prisma.setting.findMany(),
    prisma.testimonial.findMany({ where: { active: true } }),
    prisma.event.findMany({ orderBy: { date: 'desc' }, take: 3 }),
    prisma.galleryItem.findMany({ where: { active: true }, take: 6 }),
  ]);

  const config: Record<string, any> = {};
  settings.forEach((s) => {
    try {
      config[s.key] = JSON.parse(s.value);
    } catch {
      config[s.key] = s.value;
    }
  });

  return { config, testimonials, events, gallery };
}

export default async function Home() {
  const { config, testimonials, events, gallery } = await getHomeData();

  return (
    <HomeClient config={config} testimonials={testimonials} events={events} gallery={gallery} />
  );
}
