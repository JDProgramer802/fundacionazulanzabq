'use client';

import { motion } from 'framer-motion';
import { Grid3X3, Instagram, Play, UserSquare2, Bookmark, MoreHorizontal, Settings2 } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';

const InstagramProfile = () => {
  const stats = [
    { label: 'publicaciones', value: '23' },
    { label: 'seguidores', value: '342' },
    { label: 'seguidos', value: '186' },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Instagram Header Card */}
          <div className="glass-premium rounded-[3rem] p-8 md:p-12 mb-12 shadow-xl border border-gray-100">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full p-[3px] animate-spin-slow group-hover:p-[4px] transition-all">
                  <div className="bg-white rounded-full p-1 h-full w-full">
                    <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src="/logo.png"
                        alt="Fundación Azulanza"
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <h2 className="text-2xl font-semibold text-secondary">fundacionazulanza</h2>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <a
                      href="https://www.instagram.com/fundacionazulanza"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-6 py-1.5 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all shadow-md active:scale-95"
                    >
                      Seguir
                    </a>
                    <a
                      href="https://www.instagram.com/fundacionazulanza"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 text-secondary px-6 py-1.5 rounded-lg font-bold text-sm hover:bg-gray-200 transition-all active:scale-95"
                    >
                      Enviar mensaje
                    </a>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-center md:justify-start gap-8 mb-6 border-y md:border-y-0 py-4 md:py-0 border-gray-100">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center md:text-left">
                      <span className="block text-xl font-bold text-secondary">{stat.value}</span>
                      <span className="text-gray-500 text-sm">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <div className="max-w-xl">
                  <h3 className="font-bold text-secondary mb-1">Fundación Azulanza BQ</h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed">
                    Somos una entidad sin ánimo de lucro que apoya a pacientes con Cáncer desde Colombia 🇨🇴 <br />
                    🧠 Psicoeducación <br />
                    🤝 Atención psicológica, jurídica <br />
                    🔷 Talleres
                  </p>
                  <a
                    href="https://linktr.ee/fundacionazulanza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary font-bold text-sm block mt-3 hover:underline"
                  >
                    linktr.ee/fundacionazulanza
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation (Aesthetic) */}
          <div className="flex justify-center border-t border-gray-200 mb-8">
            <div className="flex gap-12 -mt-px">
              <button className="flex items-center gap-2 py-4 border-t border-secondary text-secondary text-xs font-bold uppercase tracking-widest">
                <Grid3X3 size={14} />
                Publicaciones
              </button>
              <button className="flex items-center gap-2 py-4 text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-secondary transition-colors">
                <Play size={14} />
                Reels
              </button>
              <button className="flex items-center gap-2 py-4 text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-secondary transition-colors">
                <UserSquare2 size={14} />
                Etiquetadas
              </button>
            </div>
          </div>

          {/* Post Grid (Elfsight Widget Wrapper) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] overflow-hidden min-h-[600px] relative bg-white border border-gray-100 shadow-xl"
          >
            <Script
              src="https://static.elfsight.com/platform/platform.js"
              strategy="afterInteractive"
            />
            <div
              className="elfsight-app-61783451-9c8a-493a-8686-2736149f1345"
              data-elfsight-app-lazy
            ></div>
          </motion.div>

          {/* Footer CTA */}
          <div className="mt-16 text-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.instagram.com/fundacionazulanza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              <Instagram size={24} />
              Ver perfil completo en Instagram
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramProfile;
