'use client';

import Hero from '@/components/public/Hero';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle, Loader2, MessageSquare, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function PreguntasClient() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-gradient-to-b from-white via-purple-50/30 to-white selection:bg-primary selection:text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, delay: 5 }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <Hero
        title="Preguntas Frecuentes"
        subtitle="Encuentra respuestas claras y útiles sobre nuestros servicios, cómo colaborar y cómo ser parte de la comunidad Azulanza BQ en Barranquilla."
      />

      <section className="py-20 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary/10 to-pink-300/10 rounded-full text-primary font-bold text-sm mb-8 border border-primary/20">
              <Sparkles size={16} fill="currentColor" />
              Soporte y Respuestas
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 font-primary">
              Resolvemos tus <span className="gradient-text">Dudas</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Aquí encontrarás respuestas a las preguntas más frecuentes sobre la Fundación Azulanza
              BQ. Si no encuentras lo que buscas, no dudes en contactarnos.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <Loader2 className="animate-spin text-primary" size={48} />
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                    openId === f.id
                      ? 'border-primary bg-gradient-to-r from-white to-primary/5 shadow-xl'
                      : 'border-gray-100 bg-white hover:border-primary/30 hover:shadow-lg'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(openId === f.id ? null : f.id)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-5 flex-1">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                          openId === f.id
                            ? 'bg-gradient-to-br from-primary to-pink-400 text-white'
                            : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                        }`}
                      >
                        <HelpCircle size={24} />
                      </div>
                      <h3
                        className={`text-lg font-bold transition-colors duration-300 ${
                          openId === f.id
                            ? 'text-secondary'
                            : 'text-gray-700 group-hover:text-secondary'
                        }`}
                      >
                        {f.question}
                      </h3>
                    </div>
                    <div
                      className={`transition-all duration-300 ${
                        openId === f.id
                          ? 'rotate-180 text-primary'
                          : 'text-gray-400 group-hover:text-primary'
                      }`}
                    >
                      <ChevronDown size={24} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {openId === f.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8">
                          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-6" />
                          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                            {f.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-24 rounded-[3rem] p-12 md:p-16 bg-gradient-to-br from-secondary to-blue-600 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full -ml-24 -mb-24 blur-3xl"></div>

            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
                <MessageSquare size={32} />
                ¿No encontraste lo que buscas?
              </h3>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Nuestro equipo está disponible para resolver cualquier duda adicional que tengas. No
                es necesario que esperes, ¡contáctanos ahora!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contacto"
                  className="px-8 py-3 bg-white text-secondary font-bold rounded-full hover:scale-105 transition-all shadow-lg"
                >
                  Enviar Mensaje
                </Link>
                <a
                  href="tel:+573227212546"
                  className="px-8 py-3 bg-white/20 text-white font-bold rounded-full hover:bg-white/30 transition-all border border-white/30"
                >
                  Llamar Ahora
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
