'use client';

import Hero from '@/components/public/Hero';
import { motion } from 'framer-motion';
import { Heart, Users, ShieldCheck, Target, Sparkles, Award, Globe, MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Nosotros() {
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setConfig(data));
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
      <Hero 
        title="Nuestra Historia" 
        subtitle="Conoce el corazón de la Fundación Azulanza, nuestro compromiso con la salud mental y el bienestar de nuestra comunidad." 
      />

      {/* Story Section */}
      <section className="py-24 bg-[#F9FAFB] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Desde el Corazón</span>
              <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8 font-primary leading-tight">
                ¿Cómo nació <br/><span className="gradient-text">Fundación Azulanza?</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  {config.history_text || "Fundación Azulanza nació de la profunda necesidad de brindar apoyo a quienes atraviesan momentos difíciles sin contar con los recursos necesarios. Observamos que la salud mental era a menudo un privilegio, cuando debería ser un derecho fundamental para todos."}
                </p>
                <p>
                  Nuestro camino comenzó con un pequeño grupo de profesionales apasionados que creían en el poder de la escucha y la empatía. Hoy, nos hemos convertido en un faro de esperanza para cientos de familias en nuestra región.
                </p>
                <div className="flex gap-8 pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-1">10+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">Años de Impacto</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-secondary mb-1">1k+</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">Vidas Tocadas</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] bg-gradient-brand overflow-hidden shadow-2xl rotate-3">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart size={120} className="text-white animate-pulse" fill="white" />
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-white p-6 rounded-3xl shadow-xl -rotate-6 hidden md:block border border-gray-100">
                <div className="flex flex-col h-full justify-between">
                  <Sparkles className="text-primary" size={32} />
                  <p className="text-xs font-bold text-secondary leading-tight uppercase tracking-wider">Compromiso Inquebrantable</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Modern Cards */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-12 rounded-[4rem] border-primary/10 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-bold text-secondary mb-6">Nuestra Misión</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {config.mission_text || "Transformar la realidad de nuestra comunidad a través de la atención integral en salud mental, promoviendo el bienestar emocional, social y psicológico de las personas más vulnerables."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-12 rounded-[4rem] border-secondary/10 hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
                <Globe size={32} />
              </div>
              <h3 className="text-3xl font-bold text-secondary mb-6">Nuestra Visión</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {config.vision_text || "Ser la organización líder y referente en el abordaje de la salud mental comunitaria, logrando un impacto sostenible que trascienda fronteras y genere un cambio positivo real."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] -mr-[400px] -mt-[400px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6 block">Pilares Fundamentales</span>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 font-primary">Valores que nos <span className="text-primary">mueven</span></h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                className="bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform inline-block">
                  <value.icon size={40} />
                </div>
                <h4 className="text-2xl font-bold mb-4">{value.title}</h4>
                <p className="text-blue-100/70 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#F9FAFB] to-white p-16 md:p-24 rounded-[4rem] border border-gray-100 text-center relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 pointer-events-none">
               <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
               <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8 font-primary">
                Únete a nuestra <span className="text-primary">causa</span>
              </h2>
              <p className="text-xl text-gray-500 mb-12 leading-relaxed">
                Cada pequeño gesto cuenta. Ya sea como voluntario, donante o simplemente compartiendo nuestro mensaje, tú puedes ser parte del cambio.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="btn-primary px-12 py-5 text-lg">Sé Voluntario</button>
                <button className="btn-secondary px-12 py-5 text-lg">Contactar Ahora</button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
