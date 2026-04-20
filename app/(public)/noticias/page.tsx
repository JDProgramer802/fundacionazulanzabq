import Hero from '@/components/public/Hero';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { News } from '@prisma/client';
import { ArrowRight, Calendar, Newspaper } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Noticias y Actualidad | Fundación Azulanza BQ',
  description:
    'Mantente informado sobre las actividades, jornadas de salud mental y noticias de impacto de la Fundación Azulanza BQ en Barranquilla.',
};

export const dynamic = 'force-dynamic';

async function getNews() {
  return await prisma.news.findMany({
    where: { published: true },
    orderBy: { created_at: 'desc' },
  });
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/50 to-white relative selection:bg-primary selection:text-white">
      <AnimatedBackground />

      <Hero
        title="Nuestro Blog"
        subtitle="Descubre las historias, avances y jornadas que realizamos para transformar nuestra comunidad."
      />

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary/10 to-pink-300/10 rounded-full text-primary font-bold text-sm mb-8 border border-primary/20">
              <Newspaper size={16} fill="currentColor" />
              Actualidad y Compromiso
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 font-primary">
              Historias que <span className="gradient-text">Inspiran</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {news.map((item: News) => (
              <Link
                key={item.id}
                href={`/noticias/${item.slug}`}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary">
                      <Newspaper size={64} className="opacity-20" />
                    </div>
                  )}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold text-secondary flex items-center gap-2 shadow-xl">
                    <Calendar size={14} className="text-primary" />
                    {formatDate(item.created_at)}
                  </div>
                </div>

                <div className="p-10 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed flex-1">
                    {item.excerpt || item.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold text-sm pt-6 border-t border-gray-50">
                    Leer artículo completo{' '}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {news.length === 0 && (
            <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-dashed border-gray-200">
              <Newspaper size={64} className="mx-auto text-gray-200 mb-6" />
              <p className="text-gray-400 text-xl italic">
                No hay noticias publicadas en este momento.
              </p>
              <Link
                href="/contacto"
                className="inline-block mt-8 text-primary font-bold hover:underline"
              >
                Contáctanos para más información
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
