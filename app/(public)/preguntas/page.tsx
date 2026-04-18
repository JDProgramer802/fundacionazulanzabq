'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/public/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function FAQPublic() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/faqs')
      .then(res => res.json())
      .then(data => {
        setFaqs(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-white selection:bg-primary selection:text-white">
      <Hero 
        title="Preguntas Frecuentes" 
        subtitle="Encuentra respuestas a las dudas más comunes sobre la Fundación Azulanza, nuestras asesorías y cómo colaborar." 
      />

      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Soporte y Ayuda</span>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 font-primary">Resolvemos tus <span className="gradient-text">dudas</span></h2>
            <div className="w-24 h-2 bg-gradient-brand mx-auto rounded-full"></div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={48} /></div>
          ) : (
            <div className="space-y-6">
              {faqs.map((f, i) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-[#F9FAFB] rounded-[2rem] border transition-all duration-300 ${
                    openId === f.id ? 'border-primary/20 shadow-xl shadow-primary/5 bg-white' : 'border-gray-100'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(openId === f.id ? null : f.id)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        openId === f.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                      }`}>
                        <HelpCircle size={24} />
                      </div>
                      <h3 className={`text-xl font-bold transition-colors ${
                        openId === f.id ? 'text-secondary' : 'text-gray-700'
                      }`}>{f.question}</h3>
                    </div>
                    <div className={`transition-transform duration-300 ${openId === f.id ? 'rotate-180 text-primary' : 'text-gray-400'}`}>
                      <ChevronDown size={24} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {openId === f.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 pt-2">
                           <div className="h-px bg-gray-100 mb-6" />
                           <p className="text-gray-500 text-lg leading-relaxed">{f.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-24 text-center p-12 bg-secondary rounded-[3rem] text-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
             </div>
             <h3 className="text-3xl font-bold mb-4 relative z-10">¿No encontraste lo que buscabas?</h3>
             <p className="text-blue-100/70 mb-8 max-w-xl mx-auto relative z-10">Nuestro equipo está listo para ayudarte con cualquier otra duda que tengas.</p>
             <button className="btn-primary px-12 py-4 relative z-10">Contactar a Soporte</button>
          </div>
        </div>
      </section>
    </main>
  );
}
