'use client';

import { useState } from 'react';
import Hero from '@/components/public/Hero';
import { motion } from 'framer-motion';
import { UserCheck, Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';

export default function Voluntariado() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Enviando solicitud...' });

    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.' });
        setFormData({ name: '', email: '', phone: '', interests: '' });
      } else {
        setStatus({ type: 'error', message: 'Hubo un error al enviar tu solicitud. Inténtalo de nuevo.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error de conexión.' });
    }
  };

  return (
    <main className="bg-white">
      <Hero 
        title="Únete como Voluntario" 
        subtitle="Tu tiempo y talento pueden cambiar vidas. Sé parte de nuestro equipo y ayúdanos a sanar corazones." 
      />

      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-secondary mb-8 font-primary">¿Por qué ser <span className="text-primary">voluntario</span>?</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-10">
                <p>El voluntariado en la Fundación Azulanza es una oportunidad para crecer personalmente mientras impactas positivamente en la salud mental de tu comunidad.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {[
                    "Crecimiento Personal",
                    "Experiencia Profesional",
                    "Impacto Comunitario",
                    "Red de Contactos",
                    "Certificación Social",
                    "Formación Continua"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <CheckCircle size={14} />
                      </div>
                      <span className="text-sm font-bold text-secondary uppercase tracking-wider">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary p-8 rounded-[2.5rem] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
                <p className="text-xl font-light italic leading-relaxed relative z-10">
                  "Ser voluntario en Azulanza me ha permitido ver el mundo con más empatía y entender que todos necesitamos una mano amiga en algún momento."
                </p>
                <p className="mt-4 font-bold text-primary">— Ana María, Voluntaria desde 2023</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#F9FAFB] p-10 md:p-16 rounded-[4rem] border border-gray-100"
            >
              <div className="mb-10 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                  <UserCheck size={32} />
                </div>
                <h3 className="text-3xl font-bold text-secondary">Postúlate Aquí</h3>
                <p className="text-gray-500 mt-2">Completa el formulario y nos contactaremos contigo.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-4">Nombre Completo</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-primary transition-all bg-white"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-4">Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-primary transition-all bg-white"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-4">Teléfono</label>
                  <input 
                    type="tel" 
                    className="w-full px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-primary transition-all bg-white"
                    placeholder="+57 300 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-4">¿En qué áreas te gustaría ayudar?</label>
                  <textarea 
                    rows={4}
                    className="w-full px-8 py-5 rounded-[2rem] border border-gray-200 outline-none focus:border-primary transition-all bg-white"
                    placeholder="Psicología, talleres, eventos, redes sociales..."
                    value={formData.interests}
                    onChange={(e) => setFormData({...formData, interests: e.target.value})}
                  />
                </div>

                {status.message && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl text-sm font-medium ${
                      status.type === 'success' ? 'bg-green-50 text-green-600' : 
                      status.type === 'error' ? 'bg-red-50 text-red-600' : 
                      'bg-blue-50 text-blue-600'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}

                <button 
                  type="submit" 
                  disabled={status.type === 'loading'}
                  className="w-full btn-primary py-5 rounded-full text-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status.type === 'loading' ? 'Enviando...' : 'Enviar Postulación'}
                  <Send size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
