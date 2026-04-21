'use client';

import Hero from '@/components/public/Hero';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { useFormHandler } from '@/hooks/use-form-handler';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Heart, Lightbulb, Loader2, Send, Users } from 'lucide-react';

export default function VoluntariadoClient() {
  const { formData, status, setStatus, updateField, handleSubmit } = useFormHandler({
    initialData: {
      name: '',
      email: '',
      phone: '',
      interests: '',
    },
    endpoint: '/api/volunteers',
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-primary/5 to-white relative">
      <AnimatedBackground />

      <Hero
        title="Únete como Voluntario"
        subtitle="Tu tiempo, tu talento y tu corazón pueden transformar vidas. Sé parte del cambio en tu comunidad en Barranquilla."
      />

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 font-primary">
              ¿Por qué ser <span className="gradient-text">Voluntario?</span>
            </h2>
            <p className="text-gray-500 text-lg">
              El voluntariado en Azulanza BQ es una oportunidad para crecer personalmente mientras
              generas un impacto positivo en tu comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              { icon: Heart, title: 'Impacto Real', desc: 'Cambia vidas de verdad' },
              { icon: Lightbulb, title: 'Crecimiento', desc: 'Desarrolla nuevas habilidades' },
              { icon: Users, title: 'Comunidad', desc: 'Conoce gente inspiradora' },
              { icon: Award, title: 'Certificación', desc: 'Obtén reconocimiento social' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-400 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={32} />
                </div>
                <h3 className="text-lg font-bold text-secondary mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-secondary to-blue-600 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>

            <div className="relative z-10 max-w-2xl">
              <p className="text-2xl md:text-3xl font-light italic leading-relaxed mb-8">
                &quot;Ser voluntario en Azulanza BQ me ha permitido ver el mundo con más empatía.
                Cada persona que ayudo me inspira a seguir adelante.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Heart className="text-primary" fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-lg">María López</p>
                  <p className="text-blue-100 text-sm">Voluntaria desde 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-4xl font-bold text-secondary mb-6 font-primary">
                  Postúlate Ahora
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  Completa el formulario con tus datos e intereses. Nuestro equipo se pondrá en
                  contacto contigo para conocer mejor cómo puedes contribuir.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Users, title: 'Flexible', desc: 'Elige tus propios horarios' },
                  {
                    icon: Heart,
                    title: 'Significativo',
                    desc: 'Marca la diferencia en vidas reales',
                  },
                  {
                    icon: Award,
                    title: 'Valorado',
                    desc: 'Tu trabajo es reconocido y certificado',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-pink-400 text-white flex items-center justify-center shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-gray-100 sticky top-20">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-secondary mb-4">¡Aplicación Enviada!</h2>
                    <p className="text-gray-500 mb-8">
                      Gracias por tu interés. Nos pondremos en contacto contigo muy pronto.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-8 py-3 bg-gradient-to-r from-primary to-pink-400 text-white font-bold rounded-full hover:scale-105 transition-all"
                    >
                      Enviar otra solicitud
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-3xl font-bold text-secondary mb-8">
                      Formulario de Postulación
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-secondary mb-3">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-secondary mb-3">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-secondary mb-3">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
                        placeholder="+57 300 000 0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-secondary mb-3">
                        ¿En qué áreas te gustaría ayudar? *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.interests}
                        onChange={(e) => updateField('interests', e.target.value)}
                        className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20 resize-none"
                        placeholder="Psicología, talleres, eventos, redes sociales, administrativo..."
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 text-center font-semibold">
                        Ocurrió un error. Intenta de nuevo.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 bg-gradient-to-r from-primary to-pink-400 text-white font-bold rounded-2xl hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Postulación
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
