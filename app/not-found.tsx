'use client';

import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden selection:bg-primary selection:text-white">
      <AnimatedBackground />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 2,
            }}
            className="w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 border border-primary/20 shadow-xl shadow-primary/5"
          >
            <Search size={64} className="text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-8xl md:text-9xl font-black text-secondary font-primary mb-6 tracking-tighter"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 font-primary"
          >
            This page could not be found.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-lg mb-12 leading-relaxed"
          >
            Lo sentimos, la página que estás buscando no existe o ha sido movida. Vuelve al inicio
            para seguir explorando nuestra labor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/"
              className="btn-primary flex items-center gap-2 px-8 py-4 text-lg shadow-lg shadow-primary/20 group"
            >
              <Home size={20} />
              Ir al Inicio
            </Link>

            <button
              onClick={() => window.history.back()}
              className="btn-glass flex items-center gap-2 px-8 py-4 text-lg group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Volver Atrás
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] shape-blob-pink opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] shape-blob-blue opacity-20 pointer-events-none" />
    </main>
  );
}
