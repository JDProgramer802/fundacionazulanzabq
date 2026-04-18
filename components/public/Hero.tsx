'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Heart, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20 md:pt-40">
      {/* Ultra Premium Background */}
      <div className="absolute inset-0 -z-20 bg-[#fafcff]" />
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] shape-blob-pink opacity-40 mix-blend-multiply animate-float" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] shape-blob-blue opacity-30 mix-blend-multiply animate-float-delayed" />
        {/* Removed grid.svg reference assuming it doesnt exist, using CSS radial background trick */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center min-h-[70vh]">
          {/* Text Content */}
          <motion.div style={{ opacity }} className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="inline-flex items-center gap-3 px-5 py-2 glass-premium text-secondary font-bold text-sm mb-10 shadow-sm"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Salud Mental y Bienestar
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 80 }}
              className="text-6xl md:text-7xl xl:text-[5.5rem] font-extrabold mb-8 leading-[1.05] font-primary tracking-tighter"
            >
              <span className="block text-secondary mb-3 drop-shadow-sm">Fundación</span>
              <span className="relative inline-block">
                <span className="gradient-text">{title}</span>
                <Sparkles
                  className="absolute -top-6 -right-10 text-primary animate-pulse-slow"
                  size={36}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-500 mb-12 leading-relaxed font-light font-body"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 items-start sm:items-center"
            >
              <Link
                href="/asesoria"
                className="btn-primary w-full sm:w-auto text-lg group shadow-lg shadow-primary/30"
              >
                Agendar Asesoría
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/donaciones" className="btn-glass w-full sm:w-auto text-lg group">
                Quiero Apoyar
                <Heart
                  size={20}
                  className="text-primary group-hover:scale-110 transition-transform"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Abstract Art / Interactive Element */}
          <motion.div style={{ y: y1 }} className="hidden lg:block relative h-[600px] w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central Glass Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5, type: 'spring', bounce: 0.4 }}
                className="relative z-20 w-80 h-96 glass-premium p-8 flex flex-col justify-end transform hover:-translate-y-4 hover:shadow-2xl transition-transform duration-500 rounded-[2.5rem]"
              >
                <div className="absolute top-8 right-8 w-16 h-16 bg-white/40 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Heart className="text-primary" size={32} fill="currentColor" />
                </div>
                <h3 className="text-3xl font-primary font-bold text-secondary mb-2 drop-shadow-md">
                  Apoyo <br />
                  Integral
                </h3>
                <p className="text-gray-600 font-body text-sm">
                  Creando espacios de esperanza y sanación para nuestra comunidad.
                </p>
              </motion.div>

              {/* Floating Element 1 - Top Left */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute top-10 left-10 z-30 w-40 glass p-5 rounded-3xl animate-float"
              >
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                  <Star className="text-secondary" size={20} />
                </div>
                <p className="font-bold text-secondary text-sm">+500 Familias</p>
                <p className="text-xs text-gray-500">Impactadas este año</p>
              </motion.div>

              {/* Floating Element 2 - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: -50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-10 right-10 z-10 w-48 glass p-5 rounded-3xl animate-float-delayed"
              >
                <div className="flex -space-x-3 mb-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-primary"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-secondary"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#b95786]"></div>
                </div>
                <p className="font-bold text-secondary text-sm">Red de Voluntarios</p>
                <p className="text-xs text-gray-500">Únete a la familia</p>
              </motion.div>

              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-white/50 rounded-full z-0" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blend background into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
    </section>
  );
}
