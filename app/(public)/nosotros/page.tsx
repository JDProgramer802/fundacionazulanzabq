'use client';

import Hero from '@/components/public/Hero';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { api } from '@/lib/api-client';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Globe, Heart, MessageSquare, ShieldCheck, Sparkles, Target, Users } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Nosotros() {
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    api.get('/api/settings').then(res => {
      if (res.data) setConfig(res.data);
    });
  }, []);

  return (
    <main className="bg-gradient-to-b from-white via-primary/5 to-white selection:bg-primary selection:text-white relative">
      <AnimatedBackground />

      <Hero
        title="Nuestra Historia"
        subtitle="Conoce el corazón de la Fundación Azulanza y nuestro compromiso con la salud mental y el bienestar integral de nuestra comunidad."
      />

      {/* Story Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary/10 to-pink-300/10 rounded-full text-primary font-bold text-sm mb-8 border border-primary/20">
                <Sparkles size={16} fill="currentColor" />
                Desde el Corazón
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-secondary mb-8 font-primary leading-tight">
                ¿Cómo nació <br/><span className="gradient-text">Fundación Azulanza?</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  {config.history_text || "Fundación Azulanza nació de la profunda necesidad de brindar apoyo a quienes atraviesan momentos difíciles sin contar con los recursos necesarios. Observamos que la salud mental era a menudo un privilegio, cuando debería ser un derecho fundamental para todos."}
                </p>
                <p>
                  Nuestro camino comenzó con un pequeño grupo de profesionales apasionados que creían en el poder de la escucha y la empatía. Hoy, nos hemos convertido en un faro de esperanza para cientos de familias en nuestra región.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 pt-10">
                {[
                  { value: "10+", label: "Años de Impacto" },
                  { value: "1K+", label: "Vidas Tocadas" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-white rounded-[2rem] p-6 shadow-lg border border-gray-100"
                  >
                    <div className="text-4xl font-extrabold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/20 to-pink-400/20 blur-2xl" />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative"
              >
                <div className="w-64 h-64 rounded-[3rem] bg-gradient-to-br from-primary to-pink-400 flex items-center justify-center shadow-2xl">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center"
                  >
                    <Heart size={80} className="text-white" fill="white" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                icon: Target,
                title: "Nuestra Misión",
                text: config.mission_text || "Transformar la realidad de nuestra comunidad a través de la atención integral en salud mental, promoviendo el bienestar emocional, social y psicológico de las personas más vulnerables.",
                color: "from-primary to-pink-400"
              },
              {
                icon: Globe,
                title: "Nuestra Visión",
                text: config.vision_text || "Ser la organización líder y referente en el abordaje de la salud mental comunitaria, logrando un impacto sostenible que trascienda fronteras y genere un cambio positivo real.",
                color: "from-secondary to-blue-600"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[3rem] p-12 shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-3xl font-bold text-secondary mb-6">{item.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-secondary/10 to-blue-300/10 rounded-full text-secondary font-bold text-sm mb-8 border border-secondary/20">
              <Award size={16} />
              Pilares Fundamentales
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-secondary mb-6 font-primary">
              Valores que nos <span className="gradient-text">Mueven</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Estos principios guían cada una de nuestras acciones y decisiones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Empatía", desc: "Sentimos y entendemos el dolor del otro como propio.", icon: Heart },
              { title: "Integridad", desc: "Actuamos con honestidad y transparencia total.", icon: ShieldCheck },
              { title: "Excelencia", desc: "Buscamos siempre la máxima calidad profesional.", icon: Award },
              { title: "Comunidad", desc: "Creemos en el poder de la unión para sanar.", icon: Users }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-pink-400 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-secondary mb-3">{value.title}</h4>
                <p className="text-gray-500 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-primary/5 rounded-[4rem] p-16 md:p-24 border border-gray-100 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -mr-48 -mt-48 blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl font-extrabold text-secondary mb-8 font-primary">
                Únete a nuestra <span className="gradient-text">Causa</span>
              </h2>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed">
                Cada pequeño gesto cuenta. Ya sea como voluntario, donante o simplemente compartiendo nuestro mensaje, tú puedes ser parte del cambio que transformará vidas.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/voluntariado"
                  className="px-10 py-4 bg-gradient-to-r from-primary to-pink-400 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Sé Voluntario
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/contacto"
                  className="px-10 py-4 bg-white text-secondary border-2 border-secondary font-bold rounded-full hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Contactar Ahora
                  <MessageSquare size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
