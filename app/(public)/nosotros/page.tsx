import NosotrosClient from '@/components/public/NosotrosClient';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestra Historia | Fundación Azulanza BQ',
  description:
    'Conoce el corazón de la Fundación Azulanza BQ y nuestro compromiso con la salud mental y el bienestar integral en Barranquilla.',
  openGraph: {
    title: 'Nuestra Historia | Fundación Azulanza BQ',
    description: 'Conoce nuestro compromiso con la salud mental en Barranquilla.',
    images: ['/logo.png'],
  },
};

async function getNosotrosData() {
  const settings = await prisma.setting.findMany();
  const config: Record<string, any> = {};
  settings.forEach((s) => {
    try {
      config[s.key] = JSON.parse(s.value);
    } catch {
      config[s.key] = s.value;
    }
  });
  return { config };
}

export default async function Nosotros() {
  const { config } = await getNosotrosData();
  return <NosotrosClient config={config} />;
}
