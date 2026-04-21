import GaleriaClient from '@/components/public/GaleriaClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galería de Impacto | Fundación Azulanza BQ',
  description:
    'Explora los momentos más significativos de nuestra labor social en Barranquilla. Jornadas de salud, eventos y comunidad en imágenes.',
  openGraph: {
    title: 'Galería de Impacto | Fundación Azulanza BQ',
    description: 'Nuestra labor social en imágenes. Momentos que inspiran en Barranquilla.',
    images: ['/logo.png'],
  },
};

export default function GaleriaPage() {
  return <GaleriaClient />;
}
