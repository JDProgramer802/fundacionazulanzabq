'use client';

import Hero from '@/components/public/Hero';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, Heart, MessageSquare, Quote, ShieldCheck, Star, Users } from 'lucide-react';
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
            <motion.span variants={itemVariants} className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Nuestra Esencia</motion.span>
            <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold text-secondary mb-6 font-primary">Más que una fundación, <br/><span className="gradient-text">somos una familia</span></motion.h2>
            <motion.div variants={itemVariants} className="w-24 h-2 bg-gradient-brand mx-auto rounded-full"></motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Misión",
                text: config.mission_text || "Transformando vidas a través del apoyo psicológico y social con un enfoque humano y profesional.",
                icon: Heart,
                color: "primary",
                delay: 0.1
              },
              {
                title: "Visión",
                text: config.vision_text || "Ser referentes en salud mental comunitaria en toda la región, expandiendo nuestro impacto positivo.",
                icon: ShieldCheck,
                color: "secondary",
                delay: 0.2
              },
              {
                title: "Nuestra Historia",
                text: config.history_text || "Fundación Azulanza nació del deseo de ayudar a quienes atraviesan momentos difíciles sin recursos.",
                icon: Users,
                color: "primary",
                delay: 0.3
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -15 }}
                className="glass p-10 rounded-[3rem] text-center group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 relative"
              >
                <div className={`w-20 h-20 bg-${feature.color}/10 rounded-3xl flex items-center justify-center text-${feature.color} mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                  <feature.icon size={40} fill={feature.color === 'primary' ? 'currentColor' : 'none'} />
                </div>
                <h3 className="text-3xl font-bold text-secondary mb-6">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-lg">
                  {feature.text}
                </p>
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section - Stats with parallax scroll */}
      <section className="py-32 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 border-[40px] border-white rounded-full animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] border-[60px] border-white rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            {[
              { label: "Familias Impactadas", value: "500+", icon: Users },
              { label: "Asesorías Realizadas", value: "1,200+", icon: MessageSquare },
              { label: "Voluntarios Activos", value: "50+", icon: Star },
              { label: "Jornadas de Salud", value: "25+", icon: CheckCircle2 }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-white/20 mb-4 flex justify-center">
                  <stat.icon size={48} />
                </div>
                <div className="text-6xl font-extrabold text-white mb-4 tabular-nums tracking-tighter">{stat.value}</div>
                <div className="text-blue-200 uppercase tracking-[0.2em] text-xs font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      {events.length > 0 && (
        <section className="py-32 bg-[#F9FAFB] relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Próximas Actividades</span>
              <h2 className="text-5xl font-bold text-secondary font-primary">Eventos de la <span className="gradient-text">Fundación</span></h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.slice(0, 3).map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100"
                >
                  <div className="aspect-video relative overflow-hidden">
                    {ev.image_url ? (
                      <img src={ev.image_url} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary/20">
                         <Calendar size={64} />
                      </div>
                    )}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                      <div className="text-primary font-bold text-xl">{new Date(ev.date).getDate()}</div>
                      <div className="text-gray-400 text-xs font-bold uppercase tracking-tighter">
                        {new Date(ev.date).toLocaleDateString('es-ES', { month: 'short' })}
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">{ev.title}</h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">{ev.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                         <Star size={14} className="text-primary" />
                         {ev.location || "Sede Principal"}
                      </div>
                      <Link href="/contacto" className="text-primary font-bold text-sm hover:underline">Inscribirse</Link>
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
        <section className="py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Testimonios</span>
              <h2 className="text-5xl font-bold text-secondary font-primary">Historias que <span className="gradient-text">inspiran</span></h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#F9FAFB] p-10 rounded-[3rem] relative"
                >
                  <Quote size={40} className="text-primary/20 mb-6" />
                  <p className="text-gray-600 mb-8 italic leading-relaxed text-lg">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm overflow-hidden border border-gray-100">
                      {t.image_url ? <img src={t.image_url} alt={t.name} className="w-full h-full object-cover" /> : <Users size={24} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary">{t.name}</h4>
                      <p className="text-xs text-primary font-bold uppercase tracking-wider">{t.role}</p>
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

      {/* Decorative Wave at the bottom */}
      <div className="h-24 bg-gradient-to-b from-white to-gray-50" />
    </main>
  );
}
