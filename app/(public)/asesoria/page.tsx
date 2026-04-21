import AsesoriaClient from '@/components/public/AsesoriaClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agendar Asesoría Psicológica | Fundación Azulanza BQ',
  description:
    'Solicita tu asesoría psicológica gratuita y profesional en Barranquilla. Un espacio seguro y confidencial para tu salud mental.',
  openGraph: {
    title: 'Agendar Asesoría Psicológica | Fundación Azulanza BQ',
    description: 'Solicita tu asesoría psicológica gratuita en Barranquilla.',
    images: ['/logo.png'],
  },
};

export default function AsesoriaPage() {
  return <AsesoriaClient />;
}
