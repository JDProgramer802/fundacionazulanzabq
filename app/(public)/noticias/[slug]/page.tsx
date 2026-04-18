import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, Share2, User } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const news = await prisma.news.findUnique({ where: { slug: params.slug } });
  if (!news) return {};
  return {
    title: news.meta_title || news.title,
    description: news.meta_desc || news.excerpt,
    openGraph: {
      images: [news.image_url || ''],
    },
  };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = await prisma.news.findUnique({
    where: { slug: params.slug },
  });

  if (!news) notFound();

  return (
    <article className="min-h-screen bg-white pb-24">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        {news.image_url ? (
          <img 
            src={news.image_url} 
            alt={news.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-secondary"></div>
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <Link 
              href="/noticias" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} /> Volver a noticias
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl font-primary leading-tight">
              {news.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 -mt-8">
          {/* Main Content */}
          <div className="lg:w-2/3 bg-white rounded-[2rem] p-8 md:p-12 shadow-xl relative z-10">
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-100 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                {formatDate(news.created_at)}
              </div>
              <div className="flex items-center gap-2">
                <User size={18} className="text-primary" />
                Fundación Azulanza
              </div>
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <Share2 size={18} className="text-primary" />
                Compartir
              </button>
            </div>

            <div className="prose prose-lg max-w-none prose-headings:text-secondary prose-p:text-gray-600 prose-p:leading-relaxed whitespace-pre-wrap">
              {news.content}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8 pt-8 lg:pt-0">
             <div className="bg-gray-50 rounded-3xl p-8 sticky top-24">
                <h3 className="text-xl font-bold text-secondary mb-4">¿Te gustó esta noticia?</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Ayúdanos a seguir creando impacto. Tu donación o voluntariado hace la diferencia.
                </p>
                <div className="space-y-3">
                  <Link href="/donaciones" className="btn-primary w-full text-center block">
                    Hacer una Donación
                  </Link>
                  <Link href="/contacto" className="btn-secondary w-full text-center block">
                    Ser Voluntario
                  </Link>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
