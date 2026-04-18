'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

export default function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Dynamic Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-48 -right-48 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[100px]"
        />
        
        {/* Floating Geometric Shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 5 + i, 
              repeat: Infinity, 
              delay: i * 0.5 
            }}
            className="absolute hidden md:block"
            style={{
              top: `${15 + (i * 12)}%`,
              left: `${10 + (i * 15)}%`,
            }}
          >
            <div className="w-8 h-8 border-2 border-primary/20 rounded-lg rotate-12" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          style={{ y: y1, opacity }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm mb-8 shadow-sm backdrop-blur-sm border border-primary/20"
          >
            <Heart size={16} fill="currentColor" className="animate-pulse" />
            Salud Mental y Bienestar para Todos
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] font-primary tracking-tight"
          >
            <span className="block text-secondary drop-shadow-sm">Fundación</span>
            <span className="gradient-text drop-shadow-sm">{title}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/asesoria" className="btn-primary text-lg group">
              Agendar Asesoría
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/donaciones" className="btn-secondary text-lg group">
              Quiero Apoyar
              <Heart size={20} className="group-hover:scale-110 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Modern Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg className="relative block w-full h-[80px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#F9FAFB" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5V0Z" fill="#F9FAFB" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.41,78.2,34.1,158.25,37.76,243.41,0,38.78-17.18,81.15-48.17,124.59-45.86V0Z" fill="#F9FAFB"></path>
        </svg>
      </div>
    </section>
  );
}
