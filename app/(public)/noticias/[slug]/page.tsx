import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Calendar, Heart, MessageSquare, Share2, User } from 'lucide-react';
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
    <article className="min-h-screen bg-gradient-to-b from-white via-blue-50/50 to-white pb-24">
      {/* Hero Header */}
      <div className="relative h-[70vh] min-h-[450px] w-full overflow-hidden">
        {news.image_url ? (
          <>
            <img src={news.image_url} alt={news.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          </>
        ) : (
          <>
            <div className="w-full h-full bg-gradient-to-br from-secondary to-blue-700"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </>
        )}
        <div className="absolute inset-0 flex flex-col items-end justify-end">
          <div className="container mx-auto px-4 pb-16 w-full">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-all hover:translate-x-1"
            >
              <ArrowLeft size={20} />
              <span className="font-semibold">Volver a noticias</span>
            </Link>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white max-w-4xl font-primary leading-tight mb-8">
              {news.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
              {news.excerpt || 'Descubre más sobre esta importante noticia de la Fundación Azulanza'}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 -mt-12 relative z-10">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
              {/* Meta Info */}
              <div className="px-8 md:px-16 py-8 border-b border-gray-100 flex flex-wrap gap-8 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar size={18} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs uppercase font-bold">Publicado</span>
                    <span className="text-gray-700 font-semibold">{formatDate(news.created_at)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <User size={18} className="text-secondary" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs uppercase font-bold">Por</span>
                    <span className="text-gray-700 font-semibold">Fundación Azulanza</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 md:px-16 py-12">
                <div className="prose prose-lg max-w-none 
                  prose-headings:text-secondary prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                  prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-secondary prose-strong:font-bold
                  prose-ul:list-disc prose-ul:ml-6 prose-li:text-gray-600 prose-li:mb-2
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                  prose-img:rounded-2xl prose-img:shadow-lg
                  prose-code:bg-gray-100 prose-code:text-primary prose-code:px-2 prose-code:py-1 prose-code:rounded
                  whitespace-pre-wrap">
                  {news.content}
                </div>

                {/* Share & Actions */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between gap-6 flex-wrap">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600 font-semibold">Compartir:</span>
                      <div className="flex gap-3">
                        <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary/20 text-primary flex items-center justify-center transition-all hover:scale-110">
                          <Heart size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-secondary/20 text-secondary flex items-center justify-center transition-all hover:scale-110">
                          <MessageSquare size={18} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-500/20 text-blue-500 flex items-center justify-center transition-all hover:scale-110">
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="bg-gradient-to-br from-primary to-pink-400 rounded-[3rem] p-10 text-white shadow-xl sticky top-24 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Heart size={28} fill="white" />
                  ¿Te impactó esta noticia?
                </h3>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Tú puedes marcar la diferencia. Ayúdanos a continuar transformando vidas a través de tu generosidad o voluntariado.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/donaciones"
                    className="w-full px-6 py-3 bg-white text-primary font-bold rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <Heart size={18} fill="currentColor" />
                    Hacer una Donación
                  </Link>
                  <Link
                    href="/voluntariado"
                    className="w-full px-6 py-3 bg-white/20 text-white font-bold rounded-full hover:bg-white/30 transition-all flex items-center justify-center gap-2 border border-white/30"
                  >
                    <MessageSquare size={18} />
                    Ser Voluntario
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-secondary mb-6">Más Formas de Ayudar</h4>
              <div className="space-y-4">
                {[
                  { icon: Heart, text: 'Realiza una donación', link: '/donaciones' },
                  { icon: MessageSquare, text: 'Agendar una asesoría', link: '/asesoria' },
                  { icon: User, text: 'Contáctanos', link: '/contacto' },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-primary/5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <item.icon size={18} />
                    </div>
                    <span className="font-semibold text-gray-700 group-hover:text-primary transition-colors">
                      {item.text}
                    </span>
                    <ArrowRight size={16} className="ml-auto text-gray-300 group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}