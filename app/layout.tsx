import { cn } from '@/lib/utils';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });

export const metadata: Metadata = {
  metadataBase: new URL('https://fundacionazulanzabq.org'),
  title: {
    template: '%s | Fundación Azulanza BQ',
    default: 'Fundación Azulanza BQ | Salud Mental y Apoyo Comunitario',
  },
  description:
    'Fundación Azulanza BQ brinda asistencia integral en salud mental, seguridad alimentaria y desarrollo comunitario en Barranquilla y toda Colombia.',
  keywords: [
    'fundación azulanza bq',
    'salud mental barranquilla',
    'asesoría psicológica colombia',
    'ayuda comunitaria barranquilla',
    'donaciones fundaciones colombia',
    'voluntariado barranquilla',
    'apoyo emocional',
    'atención psicológica gratuita',
    'seguridad alimentaria barranquilla',
  ],
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://fundacionazulanzabq.org',
  },
  openGraph: {
    title: 'Fundación Azulanza BQ | Salud Mental y Apoyo Comunitario',
    description:
      'Brindamos asistencia integral en salud mental, seguridad alimentaria y desarrollo comunitario en Barranquilla.',
    url: 'https://fundacionazulanzabq.org',
    siteName: 'Fundación Azulanza BQ',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fundación Azulanza BQ | Salud Mental y Apoyo Comunitario',
    description: 'Asistencia integral en salud mental y desarrollo comunitario en Barranquilla.',
  },
  verification: {
    google: 'googlefb13558cfef6d24a',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Fundación Azulanza BQ',
    alternateName: 'Fundación Azulanza',
    url: 'https://fundacionazulanzabq.org',
    logo: 'https://fundacionazulanzabq.org/logo.png',
    description:
      'Fundación Azulanza BQ brinda asistencia integral en salud mental, seguridad alimentaria y desarrollo comunitario en Barranquilla y toda Colombia.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Barranquilla',
      addressCountry: 'CO',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+57-300-000-0000', // Update with actual phone if available
      contactType: 'customer service',
      email: 'info@fundacionazulanzabq.org',
    },
    sameAs: [
      'https://www.facebook.com/fundacionazulanza',
      'https://www.instagram.com/fundacionazulanza?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      'https://twitter.com/fundacionazulanza',
    ],
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn(inter.variable, jakarta.variable, 'font-body antialiased')}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
