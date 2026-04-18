'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-secondary mb-4 font-primary">Contáctanos</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            ¿Tienes dudas, sugerencias o quieres sumarte a nuestra causa? Estamos aquí para escucharte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <Mail size={24} />
                  </div>
                  <h3 className="font-bold text-secondary mb-2">Escríbenos</h3>
                  <p className="text-gray-500 text-sm">fundacion@azulanza.org</p>
               </div>
               <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
                    <Phone size={24} />
                  </div>
                  <h3 className="font-bold text-secondary mb-2">Llámanos</h3>
                  <p className="text-gray-500 text-sm">+57 300 123 4567</p>
               </div>
               <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 transition-all hover:shadow-lg md:col-span-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <MapPin size={24} />
                  </div>
                  <h3 className="font-bold text-secondary mb-2">Ubicación</h3>
                  <p className="text-gray-500 text-sm">Barranquilla, Colombia - Sede Principal</p>
               </div>
            </div>

            <div className="bg-secondary rounded-[2.5rem] p-10 text-white relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-4">¿Eres profesional?</h3>
                 <p className="text-blue-100 mb-8 leading-relaxed">
                   Buscamos psicólogos, trabajadores sociales y voluntarios comprometidos para nuestras jornadas.
                 </p>
                 <a href="mailto:voluntarios@azulanza.org" className="inline-flex items-center gap-2 bg-white text-secondary px-8 py-3 rounded-full font-bold hover:scale-105 transition-all">
                   Unirse como Voluntario
                 </a>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-50">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-bold text-secondary mb-4">¡Mensaje Recibido!</h2>
                <p className="text-gray-500 mb-8">
                  Gracias por escribirnos. Nos pondremos en contacto contigo lo antes posible.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="btn-primary"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    placeholder="Tu nombre..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">Mensaje</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all h-40"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium">Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Send size={20} /> Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
