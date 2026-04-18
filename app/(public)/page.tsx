'use client';

import Hero from '@/components/public/Hero';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Heart,
  MessageSquare,
  Quote,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [config, setConfig] = useState<any>({});
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setConfig(data));

    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data));

    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="bg-white selection:bg-primary selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <Hero
        title={config.home_hero_title || "Sanando Corazones"}
        subtitle={config.home_hero_subtitle || "Apoyo integral en salud mental y herramientas para el bienestar de nuestra comunidad."}
      />

      {/* Features Section - Interactive Cards */}
      <section className="py-32 bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-24"
          >
            <motion.span variants={itemVariants} className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Nuestra Esencia</motion.span>
            <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold text-secondary mb-6 font-primary">Más que una fundación, <br/><span className="gradient-text">somos una familia</span></motion.h2>
            <motion.div variants={itemVariants} className="w-32 h-1 bg-gradient-brand mx-auto rounded-full"></motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {[
              {
                title: "Misión",
                text: config.mission_text || "Transformando vidas a través del apoyo psicológico y social con un enfoque humano y profesional.",
                icon: Heart,
                color: "primary",
                delay: 0.1,
                accent: "from-pink-300 to-primary"
              },
              {
                title: "Visión",
                text: config.vision_text || "Ser referentes en salud mental comunitaria en toda la región, expandiendo nuestro impacto positivo.",
                icon: ShieldCheck,
                color: "secondary",
                delay: 0.2,
                accent: "from-blue-400 to-secondary"
              },
              {
                title: "Nuestra Historia",
                text: config.history_text || "Fundación Azulanza nació del deseo de ayudar a quienes atraviesan momentos difíciles sin recursos.",
                icon: Users,
                color: "primary",
                delay: 0.3,
                accent: "from-primary to-pink-300"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -20, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="relative h-full bg-white rounded-[3rem] p-10 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/20">
                  {/* Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.accent}`} />
                  
                  {/* Icon Container */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.accent} rounded-3xl flex items-center justify-center text-white mx-auto mb-8 group-hover:scale-125 transition-transform duration-500 shadow-lg`}>
                    <feature.icon size={40} />
                  </div>

                  {/* Content */}
                  <h3 className="text-3xl font-bold text-secondary mb-6 text-center">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-lg text-center mb-6">
                    {feature.text}
                  </p>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-full blur-2xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section - Stats with parallax scroll */}
      <section className="py-32 bg-gradient-to-br from-secondary via-secondary to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 border-[40px] border-white rounded-full animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] border-[60px] border-white rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-pink-300 to-primary" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="text-white/80 font-bold tracking-widest uppercase text-sm mb-4 block">Nuestro Impacto</span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 font-primary">Números que <span className="text-pink-300">Hablan</span></h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">Cada número representa una vida transformada, una esperanza renovada</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Familias Impactadas", value: "500", icon: Users, suffix: "+" },
              { label: "Asesorías Realizadas", value: "1", icon: MessageSquare, suffix: ",200+", isDecimal: true },
              { label: "Voluntarios Activos", value: "50", icon: Star, suffix: "+" },
              { label: "Jornadas de Salud", value: "25", icon: CheckCircle2, suffix: "+" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-pink-300/10 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] text-center group-hover:border-white/40 transition-all duration-300 h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-primary rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                    <stat.icon size={32} />
                  </div>
                  <div className="text-5xl md:text-6xl font-extrabold text-white mb-2 tabular-nums tracking-tighter">
                    {stat.value}{stat.isDecimal ? "" : ""}{stat.suffix}
                  </div>
                  <div className="text-white/70 uppercase tracking-[0.15em] text-xs font-bold">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      {events.length > 0 && (
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Próximas Actividades</span>
              <h2 className="text-5xl md:text-6xl font-extrabold text-secondary font-primary mb-6">Eventos de la <span className="gradient-text">Fundación</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Únete a nuestras actividades y sé parte del cambio en tu comunidad</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.slice(0, 3).map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group h-full"
                >
                  <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 h-full flex flex-col border border-gray-100 hover:border-primary/20">
                    <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                      {ev.image_url ? (
                        <img src={ev.image_url} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/20">
                          <Calendar size={64} />
                        </div>
                      )}
                      {/* Date Badge */}
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        className="absolute top-6 left-6 bg-gradient-to-br from-primary to-pink-400 text-white px-5 py-3 rounded-2xl shadow-xl backdrop-blur-sm border border-white/20"
                      >
                        <div className="text-2xl font-extrabold">{new Date(ev.date).getDate()}</div>
                        <div className="text-xs font-bold uppercase tracking-wider opacity-90">
                          {new Date(ev.date).toLocaleDateString('es-ES', { month: 'short' })}
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors line-clamp-2">{ev.title}</h3>
                      <p className="text-gray-500 text-sm mb-8 line-clamp-3 flex-1">{ev.description}</p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold">
                          <Calendar size={14} className="text-primary" />
                          {ev.location || "Sede Principal"}
                        </div>
                        <Link href="/contacto" className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary to-pink-400 text-white font-bold text-sm rounded-full hover:shadow-lg transition-all hover:scale-105 active:scale-95">
                          Inscribirse <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-32 bg-gradient-to-b from-blue-50/50 to-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -mr-48 -mb-48" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Testimonios</span>
              <h2 className="text-5xl md:text-6xl font-extrabold text-secondary font-primary mb-6">Historias que <span className="gradient-text">Inspiran</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Escucha las voces de quienes han transformado sus vidas con nuestro apoyo</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  
                  <div className="relative bg-white p-10 rounded-[3rem] h-full border border-gray-100 group-hover:border-primary/20 transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                    <div className="flex justify-between items-start mb-6">
                      <Quote size={40} className="text-primary/20" />
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-primary text-primary" />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed text-lg italic">"{t.text}"</p>

                    <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-pink-400 rounded-full flex items-center justify-center text-white overflow-hidden shadow-md border-2 border-white">
                        {t.image_url ? (
                          <img src={t.image_url} alt={t.name} className="w-full h-full object-cover" />
                        ) : (
                          <Users size={28} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-secondary text-lg">{t.name}</h4>
                        <p className="text-xs text-primary font-bold uppercase tracking-wider">{t.role || "Beneficiario"}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action - Ultra Modern Layout */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-secondary rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(3,86,203,0.3)]"
          >
            {/* Abstract Background for CTA */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
            </div>

             <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-white/20"
                >
                  <MessageSquare size={48} className="text-white" />
                </motion.div>

                <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight font-primary">
                  ¿Necesitas <span className="text-primary">apoyo</span> hoy?
                </h2>

                <p className="text-xl md:text-2xl mb-16 text-blue-100 font-light leading-relaxed max-w-2xl mx-auto">
                  No estás solo. Nuestro equipo está listo para escucharte. Tu bienestar es nuestra prioridad número uno.
                </p>

                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                  <Link href="/asesoria" className="bg-white text-secondary font-bold px-12 py-5 rounded-full text-xl hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] transition-all hover:scale-110 active:scale-95 flex items-center gap-3">
                    Agendar Asesoría <ArrowRight size={24} />
                  </Link>
                  <Link href="/contacto" className="text-white font-bold text-xl hover:text-primary transition-colors flex items-center gap-2 group">
                    Hablar con alguien <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* How to Help Section */}
      <section className="py-32 bg-[#F9FAFB] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-24"
          >
            <motion.span variants={itemVariants} className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Únete a la Causa</motion.span>
            <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-secondary mb-6 font-primary">Cómo <span className="gradient-text">Ayudar</span></motion.h2>
            <motion.div variants={itemVariants} className="w-24 h-2 bg-gradient-brand mx-auto rounded-full"></motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Dona",
                text: "Tu contribución financiera nos ayuda a expandir nuestros programas y llegar a más personas que necesitan apoyo.",
                icon: Heart,
                color: "primary",
                href: "/donaciones",
                delay: 0.1
              },
              {
                title: "Sé Voluntario",
                text: "Únete a nuestro equipo de voluntarios y contribuye con tu tiempo y habilidades para hacer la diferencia.",
                icon: Users,
                color: "secondary",
                href: "/voluntariado",
                delay: 0.2
              },
              {
                title: "Comparte",
                text: "Ayuda a difundir nuestro mensaje compartiendo nuestras historias y actividades en tus redes sociales.",
                icon: MessageSquare,
                color: "primary",
                href: "/contacto",
                delay: 0.3
              }
            ].map((help, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: help.delay }}
                whileHover={{ y: -15 }}
                className="glass p-10 rounded-[3rem] text-center group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 relative"
              >
                <div className={`w-20 h-20 bg-${help.color}/10 rounded-3xl flex items-center justify-center text-${help.color} mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                  <help.icon size={40} fill={help.color === 'primary' ? 'currentColor' : 'none'} />
                </div>
                <h3 className="text-3xl font-bold text-secondary mb-6">{help.title}</h3>
                <p className="text-gray-500 leading-relaxed text-lg mb-8">
                  {help.text}
                </p>
                <Link href={help.href} className={`inline-flex items-center gap-2 px-8 py-4 bg-${help.color} text-white font-bold rounded-full hover:shadow-lg transition-all hover:scale-105`}>
                  Más Información <ArrowRight size={20} />
                </Link>
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Wave at the bottom */}
      <div className="h-24 bg-gradient-to-b from-white to-gray-50" />
    </main>
  );
}
