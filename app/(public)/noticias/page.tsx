import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { News } from '@prisma/client';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Noticias y Actualidad',
  description: 'Mantente informado sobre las actividades, jornadas de salud y noticias de la Fundación Azulanza.',
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
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-secondary mb-4 font-primary">Nuestro Blog</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Descubre las historias, avances y jornadas que realizamos para transformar nuestra comunidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item: News) => (
            <Link
              key={item.id}
              href={`/noticias/${item.slug}`}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
                    No image
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-secondary flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  {formatDate(item.created_at)}
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {item.excerpt || item.content.substring(0, 150) + '...'}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  Leer más <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 italic">No hay noticias publicadas en este momento.</p>
          </div>
        )}
      </div>
    </main>
  );
}
