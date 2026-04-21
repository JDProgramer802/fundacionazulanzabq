import DonacionesClient from '@/components/public/DonacionesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donaciones | Apoya nuestra causa | Fundación Azulanza BQ',
  description:
    'Tu generosidad nos permite seguir brindando apoyo en salud mental y bienestar integral en Barranquilla. ¡Haz tu donación hoy!',
  openGraph: {
    title: 'Donaciones | Fundación Azulanza BQ',
    description: 'Apoya nuestra labor social en Barranquilla a través de tu donación.',
    images: ['/logo.png'],
  },
};

export default function DonacionesPage() {
  return <DonacionesClient />;
}
