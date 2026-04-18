'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-20 md:pt-48">
      {/* Advanced Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-blue-50/30 to-pink-50/30" />

      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary to-pink-300 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary to-blue-400 rounded-full blur-3xl opacity-20"
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 text-primary/15"
        >
          <Heart size={80} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -10, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 right-1/4 text-secondary/15"
        >
          <Heart size={70} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 left-1/3 text-primary/10"
        >
          <Heart size={60} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/3 right-1/3 text-secondary/10"
        >
          <Heart size={50} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ y: y1, opacity }} className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/50 backdrop-blur-sm rounded-full text-primary font-bold text-xs md:text-sm mb-8 shadow-sm border border-primary/10"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            Salud Mental y Bienestar para Todos
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 100 }}
            className="text-5xl md:text-7xl xl:text-8xl font-extrabold mb-8 leading-[1.1] font-primary tracking-tighter"
          >
            <span className="block text-secondary mb-2">Fundación</span>
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent inline-block relative">
              {title}
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed font-light px-4"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <Link href="/asesoria" className="btn-primary w-full sm:w-auto text-lg group">
              Agendar Asesoría
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/donaciones" className="btn-secondary w-full sm:w-auto text-lg group">
              Quiero Apoyar
              <Heart size={20} className="group-hover:scale-110 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Simplified and Adjusted Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105,123.59,105.47,185.76,97.21c59.92-8,122.49-30.42,135.63-40.77Z"
            fill="#F9FAFB"
          ></path>
        </svg>
      </div>
    </section>
  );
}
