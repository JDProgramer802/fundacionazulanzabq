'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Loader2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AsesoriaPage() {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    datetime: '',
    reason: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
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
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm mb-6">
            <Heart size={16} fill="currentColor" />
            Asistencia Profesional Gratuita
          </div>
          <h1 className="text-5xl font-bold text-secondary mb-6 font-primary">Agenda tu Asesoría</h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Nuestra misión es brindarte un espacio seguro para ser escuchado. 
            Contamos con un equipo de profesionales listos para apoyarte en tu camino hacia el bienestar emocional.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-secondary p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-2 font-primary">Formulario de Agendamiento</h2>
            <p className="text-blue-100 opacity-80">Completa tus datos y nos pondremos en contacto contigo.</p>
          </div>

          <div className="p-8 md:p-16">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-bold text-secondary mb-4">¡Cita Solicitada!</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Tu solicitud ha sido recibida con éxito. Un miembro de nuestro equipo te contactará vía email o teléfono para confirmar la fecha y hora exacta.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="btn-primary"
                >
                  Volver a agendar
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={formData.client_email}
                      onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary">Teléfono</label>
                    <input
                      type="tel"
                      required
                      value={formData.client_phone}
                      onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="Ej: 3001234567"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary">Fecha Sugerida</label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.datetime}
                      onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">Motivo de la consulta (Opcional)</label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all h-32"
                    placeholder="Cuéntanos brevemente en qué podemos ayudarte..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium">Ocurrió un error. Por favor intenta de nuevo.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3"
                >
                  {status === 'loading' ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <CalendarIcon size={20} /> Solicitar Cita
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
