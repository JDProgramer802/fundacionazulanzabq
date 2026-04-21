import PreguntasClient from '@/components/public/PreguntasClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Fundación Azulanza BQ',
  description:
    'Encuentra respuestas a tus dudas sobre los servicios de salud mental, voluntariado y donaciones en la Fundación Azulanza BQ de Barranquilla.',
  openGraph: {
    title: 'Preguntas Frecuentes | Fundación Azulanza BQ',
    description: 'Resolvemos tus dudas sobre nuestra labor social en Barranquilla.',
    images: ['/logo.png'],
  },
};

export default function PreguntasPage() {
  return <PreguntasClient />;
}
