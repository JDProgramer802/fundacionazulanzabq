import ContactoClient from '@/components/public/ContactoClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Fundación Azulanza BQ',
  description:
    'Ponte en contacto con la Fundación Azulanza BQ en Barranquilla. Estamos aquí para escucharte, resolver tus dudas y recibir tu apoyo.',
  openGraph: {
    title: 'Contacto | Fundación Azulanza BQ',
    description: 'Comunícate con nosotros. Tu mensaje es importante para la Fundación Azulanza BQ.',
    images: ['/logo.png'],
  },
};

export default function ContactoPage() {
  return <ContactoClient />;
}
