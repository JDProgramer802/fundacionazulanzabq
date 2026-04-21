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
  Users,
  Camera,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface HomeClientProps {
  config: any;
  testimonials: any[];
  events: any[];
  gallery: any[];
}

export default function HomeClient({ config, testimonials, events, gallery }: HomeClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="bg-white selection:bg-primary selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-[#b95786] to-secondary z-[60] origin-left"
        style={{ scaleX }}
      />

      <Hero
        title={config.home_hero_title || 'Sanando Corazones'}
        subtitle={
          config.home_hero_subtitle ||
          'Apoyo integral en salud mental y herramientas para el bienestar de nuestra comunidad.'
        }
      />

      {/* Features Section - Asymmetric Interactive Cards */}
      <section className="py-32 relative overflow-hidden bg-[#fafcff]">
        <div className="absolute top-0 right-0 w-96 h-96 shape-blob-pink opacity-20 -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 shape-blob-blue opacity-20 -ml-48 -mb-48" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-24 lg:mb-32 max-w-3xl mx-auto"
          >
            <motion.span
              variants={itemVariants}
              className="px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary font-bold tracking-widest uppercase text-xs mb-6 inline-block"
            >
              Nuestra Esencia
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-extrabold text-secondary mb-6 font-primary leading-tight"
            >
              Más que una fundación, <br />
              <span className="gradient-text">somos una familia</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-500 text-lg">
              Comprometidos con el crecimiento y la sanación emocional a todos los niveles de
              nuestra sociedad.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 relative">
            {/* Background connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10" />

            {[
              {
                title: 'Misión',
                text:
                  config.mission_text ||
                  'Transformando vidas a través del apoyo psicológico y social con un enfoque humano y profesional.',
                icon: Heart,
                color: 'primary',
                offset: 'lg:mt-0',
              },
              {
                title: 'Visión',
                text:
                  config.vision_text ||
                  'Ser referentes en salud mental comunitaria en toda la región, expandiendo nuestro impacto positivo.',
                icon: ShieldCheck,
                color: 'secondary',
                offset: 'lg:mt-16', // Asymmetric offset
              },
              {
                title: 'Historia',
                text:
                  config.history_text ||
                  'Fundación Azulanza nació del deseo de ayudar a quienes atraviesan momentos difíciles sin recursos.',
                icon: Users,
                color: 'primary',
                offset: 'lg:mt-4',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`group ${feature.offset}`}
              >
                <div className="relative h-full glass-premium p-10 overflow-hidden card-hover">
                  <div
                    className={`w-20 h-20 bg-${feature.color}/10 rounded-3xl flex items-center justify-center text-${feature.color} mx-auto mb-8 group-hover:scale-[1.15] group-hover:rotate-6 transition-all duration-500 shadow-inner`}
                  >
                    <feature.icon
                      size={40}
                      className={feature.color === 'primary' ? 'text-primary' : 'text-secondary'}
                      fill="currentColor"
                      fillOpacity={0.2}
                    />
                  </div>

                  <h3 className="text-3xl font-bold text-secondary mb-4 text-center group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-center mb-6 font-body">
                    {feature.text}
                  </p>

                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Impact Section */}
      <section className="py-32 relative overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] shape-blob-pink mix-blend-screen opacity-50" />
          <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] shape-blob-blue mix-blend-screen opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="px-6 py-2 rounded-full border border-white/20 bg-white/10 text-white font-bold tracking-widest uppercase text-xs mb-6 inline-block backdrop-blur-sm">
              Impacto Constante
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 font-primary">
              Números que <span className="text-primary text-stroke">Hablan</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Familias Impactadas', value: '500', icon: Users, suffix: '+' },
              { label: 'Asesorías Realizadas', value: '1,200', icon: MessageSquare, suffix: '+' },
              { label: 'Voluntarios Activos', value: '50', icon: Star, suffix: '+' },
              { label: 'Jornadas de Salud', value: '25', icon: CheckCircle2, suffix: '+' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative"
              >
                <div className="relative glass-dark p-8 rounded-[2.5rem] text-center h-full flex flex-col items-center justify-center border-white/20 hover:border-primary/50 transition-colors duration-500 cursor-default">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-300 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/30 group-hover:rotate-[15deg] transition-transform duration-500">
                    <stat.icon size={32} />
                  </div>
                  <div className="text-5xl md:text-6xl font-extrabold text-white mb-2 tabular-nums font-primary drop-shadow-lg">
                    {stat.value}
                    <span className="text-primary">{stat.suffix}</span>
                  </div>
                  <div className="text-white/60 uppercase tracking-[0.15em] text-xs font-bold font-body">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      {events.length > 0 && (
        <section className="py-32 relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] shape-blob-pink opacity-10" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
            >
              <div className="max-w-2xl">
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                  Próximas Actividades
                </span>
                <h2 className="text-5xl md:text-6xl font-extrabold text-secondary font-primary mb-4">
                  Eventos <span className="gradient-text">Destacados</span>
                </h2>
                <p className="text-gray-500 text-lg">
                  Únete a nuestras actividades y sé parte del cambio en tu comunidad.
                </p>
              </div>
              <Link
                href="/eventos"
                className="btn-secondary whitespace-nowrap self-start md:self-end"
              >
                Ver todos los eventos
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.slice(0, 3).map((ev, i) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group h-full"
                >
                  <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(238,132,181,0.15)] transition-all duration-500 h-full flex flex-col border border-gray-100 hover:border-primary/30 hover:-translate-y-2">
                    <div className="aspect-video relative overflow-hidden bg-gray-50">
                      {ev.image_url ? (
                        <Image
                          src={ev.image_url}
                          alt={ev.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/20">
                          <Calendar size={64} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute top-5 left-5 glass px-4 py-2 rounded-2xl shadow-lg border-white/40 flex flex-col items-center justify-center">
                        <div className="text-xl font-extrabold text-secondary leading-none">
                          {new Date(ev.date).getDate()}
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          {new Date(ev.date).toLocaleDateString('es-ES', { month: 'short' })}
                        </div>
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {ev.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                        {ev.description}
                      </p>

                      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold bg-gray-50 px-3 py-1.5 rounded-full">
                          <Calendar size={14} className="text-primary" />
                          <span className="truncate max-w-[120px]">
                            {ev.location || 'Sede Principal'}
                          </span>
                        </div>
                        <Link
                          href="/eventos"
                          className="text-primary font-bold text-sm inline-flex items-center gap-1 group-hover:text-secondary transition-colors"
                        >
                          Participar{' '}
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />
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

      {/* Recent Gallery Section - Added 2026-04-18 */}
      {gallery.length > 0 && (
        <section className="py-32 relative overflow-hidden bg-[#fafcff]">
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] shape-blob-blue opacity-10 -translate-y-1/2" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20 max-w-3xl mx-auto"
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
                Momentos que Inspiran
              </span>
              <h2 className="text-5xl md:text-6xl font-extrabold text-secondary font-primary mb-6">
                Nuestra <span className="gradient-text">Galería</span>
              </h2>
              <p className="text-gray-500 text-lg">
                Un vistazo rápido a las sonrisas y el trabajo que realizamos día a día.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {gallery.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-square relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <Link href="/galeria">
                    <Image
                      src={item.image_url}
                      alt={item.title || 'Fundación Azulanza BQ'}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="text-white" size={24} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/galeria" className="btn-glass inline-flex items-center gap-2">
                Ver Galería Completa <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-32 relative overflow-hidden bg-[#fafcff]">
          <div className="absolute top-1/2 left-0 w-full h-[500px] shape-blob-blue opacity-10 -translate-y-1/2" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24 max-w-2xl mx-auto"
            >
              <Quote className="mx-auto text-primary mb-6 animate-pulse-slow" size={48} />
              <h2 className="text-5xl md:text-6xl font-extrabold text-secondary font-primary mb-6">
                Voces de la <span className="gradient-text">Comunidad</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="group"
                >
                  <div className="glass-premium p-10 h-full flex flex-col justify-between card-hover text-center">
                    <div className="flex justify-center gap-1 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="fill-primary text-primary" />
                      ))}
                    </div>

                    <p className="text-gray-600 mb-10 leading-relaxed text-lg italic font-body relative z-10 flex-1">
                      &quot;{t.text}&quot;
                    </p>

                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-300 rounded-full flex items-center justify-center text-white overflow-hidden shadow-lg border-2 border-white relative">
                        {t.image_url ? (
                          <Image src={t.image_url} alt={t.name} fill className="object-cover" />
                        ) : (
                          <Users size={28} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary text-lg">{t.name}</h4>
                        <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">
                          {t.role || 'Beneficiario'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action - Ultra Premium Glassy Layout */}
      <section className="py-24 relative overflow-hidden px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] p-12 md:p-24 text-center text-white overflow-hidden shadow-2xl bg-secondary"
          >
            {/* Dynamic CTA Backgrounds */}
            <div className="absolute -top-32 -right-32 w-96 h-96 shape-blob-pink mix-blend-screen opacity-100" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 shape-blob-blue mix-blend-screen opacity-100" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
            <div className="absolute inset-0 bg-secondary/40 backdrop-blur-sm" />{' '}
            {/* Dimmer overlay for reading */}
            <div className="absolute inset-0 rounded-[3rem] border-2 border-white/10" />
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <div className="inline-flex px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md mb-8 text-xs font-bold tracking-widest uppercase">
                Tu Salud Mental Importa
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight font-primary drop-shadow-md">
                ¿Necesitas hablar <br />
                con <span className="text-primary text-stroke drop-shadow-none">alguien?</span>
              </h2>

              <p className="text-xl md:text-2xl mb-12 text-blue-50 font-light leading-relaxed">
                Nuestros especialistas están listos para escucharte en un espacio seguro y
                confidencial.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
                <Link
                  href="/asesoria"
                  className="bg-white text-secondary font-bold px-10 py-4 rounded-full text-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                >
                  Agendar Cita <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contacto"
                  className="px-10 py-4 rounded-full text-lg border border-white/40 bg-white/10 backdrop-blur-md text-white font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2 group"
                >
                  Mensaje Directo
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How to Help Section */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] shape-blob-blue opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-secondary mb-6 font-primary"
            >
              Únete a la <span className="gradient-text">Causa</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: 'Aporta',
                text: 'Tu donación directa financia jornadas psicológicas gratuitas.',
                icon: Heart,
                color: 'primary',
                href: '/donaciones',
                delay: 0.1,
              },
              {
                title: 'Participa',
                text: 'Únete como voluntario y dedica tu talento a quienes lo necesitan.',
                icon: Users,
                color: 'secondary',
                href: '/voluntariado',
                delay: 0.2,
              },
              {
                title: 'Difunde',
                text: 'Comparte nuestras redes y multiplica nuestro mensaje de esperanza.',
                icon: MessageSquare,
                color: 'primary',
                href: '/contacto',
                delay: 0.3,
              },
            ].map((help, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: help.delay }}
                className={`glass p-12 rounded-[3rem] text-center group cursor-pointer border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500`}
                style={{
                  borderColor:
                    i === 0
                      ? 'rgba(238,132,181,0.1)'
                      : i === 1
                        ? 'rgba(3,86,203,0.1)'
                        : 'rgba(238,132,181,0.1)',
                }}
              >
                <div
                  className={`w-20 h-20 bg-${help.color}/10 rounded-full flex items-center justify-center text-${help.color} mx-auto mb-8 group-hover:scale-[1.2] group-hover:bg-${help.color} group-hover:text-white transition-all duration-500`}
                >
                  <help.icon size={36} />
                </div>
                <h3 className="text-3xl font-bold text-secondary mb-4 font-primary">
                  {help.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-body mb-8">{help.text}</p>
                <Link
                  href={help.href}
                  className={`inline-flex items-center gap-2 text-sm font-bold text-${help.color} group-hover:text-secondary transition-colors uppercase tracking-widest`}
                >
                  Descubrir{' '}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
