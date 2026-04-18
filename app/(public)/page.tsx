import Hero from '@/components/public/Hero';
import prisma from '@/lib/prisma';
import { Heart, MessageSquare, ShieldCheck, Users } from 'lucide-react';

async function getHomeData() {
  const settings = await prisma.setting.findMany();
  const config: Record<string, any> = {};
  settings.forEach((s) => {
    try {
      config[s.key] = JSON.parse(s.value);
    } catch {
      config[s.key] = s.value;
    }
  });

  const recentNews = await prisma.news.findMany({
    where: { published: true },
    orderBy: { created_at: 'desc' },
    take: 3,
  });

  return { config, recentNews };
}

export default async function Home() {
  const { config, recentNews } = await getHomeData();

  return (
    <main className="bg-white">
      <Hero
        title={config.home_hero_title || "Sanando Corazones"}
        subtitle={config.home_hero_subtitle || "Apoyo integral en salud mental."}
      />

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">Nuestra Esencia</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                <Heart size={32} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                {config.mission_text || "Transformando vidas a través del apoyo psicológico."}
              </p>
            </div>

            <div className="glass p-8 rounded-3xl text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                {config.vision_text || "Ser referentes en salud mental comunitaria."}
              </p>
            </div>

            <div className="glass p-8 rounded-3xl text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Nuestra Historia</h3>
              <p className="text-gray-600 leading-relaxed">
                {config.history_text || "Fundación Azulanza nació del deseo de ayudar..."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border-8 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border-8 border-white rounded-full opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100 uppercase tracking-wider text-sm">Familias</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1.2k</div>
              <div className="text-blue-100 uppercase tracking-wider text-sm">Asesorías</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-blue-100 uppercase tracking-wider text-sm">Voluntarios</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-blue-100 uppercase tracking-wider text-sm">Proyectos</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-brand rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
             <div className="relative z-10 max-w-3xl mx-auto">
                <MessageSquare size={48} className="mx-auto mb-8 opacity-50" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">¿Necesitas hablar con alguien?</h2>
                <p className="text-xl mb-10 text-white/90">
                  Estamos aquí para escucharte y brindarte el apoyo que necesitas. Nuestra primera asesoría es totalmente gratuita.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/asesoria" className="bg-white text-secondary font-bold px-10 py-4 rounded-full hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                    Agendar Ahora
                  </a>
                  <a href="/contacto" className="bg-secondary/20 backdrop-blur-sm border border-white/30 text-white font-bold px-10 py-4 rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
                    Contactar
                  </a>
                </div>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
