import VoluntariadoClient from '@/components/public/VoluntariadoClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voluntariado | Únete al cambio | Fundación Azulanza BQ',
  description:
    'Sé parte de nuestro equipo de voluntarios en Barranquilla. Tu talento y tiempo pueden transformar vidas en la Fundación Azulanza BQ.',
  openGraph: {
    title: 'Voluntariado | Fundación Azulanza BQ',
    description: 'Únete como voluntario y ayuda a transformar vidas en Barranquilla.',
    images: ['/logo.png'],
  },
};

export default function VoluntariadoPage() {
  return <VoluntariadoClient />;
}
