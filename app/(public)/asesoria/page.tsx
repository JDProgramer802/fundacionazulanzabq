'use client';

import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { useFormHandler } from '@/hooks/use-form-handler';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Heart, Loader2, Send } from 'lucide-react';

export default function AsesoriaPage() {
  const { formData, status, setStatus, updateField, handleSubmit } = useFormHandler({
    initialData: {
      client_name: '',
      client_email: '',
      client_phone: '',
      datetime: '',
      reason: '',
    },
    endpoint: '/api/appointments',
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/50 to-white relative">
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary/10 to-pink-300/10 rounded-full text-primary font-bold text-sm mb-8 border border-primary/20">
            <Heart size={16} fill="currentColor" />
            Asistencia Profesional Gratuita
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-secondary mb-8 font-primary">
            Agenda tu <span className="gradient-text">Asesoría</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Nuestro equipo de profesionales está listo para escucharte sin prejuicios. Un espacio
            seguro, confidencial y completamente gratuito para tu bienestar emocional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto mb-20">
          {/* Benefits Cards */}
          {[
            {
              icon: Heart,
              title: 'Apoyo Profesional',
              desc: 'Psicólogos y terapeutas certificados',
            },
            { icon: Clock, title: 'Horarios Flexibles', desc: 'Disponible según tu conveniencia' },
            {
              icon: CheckCircle2,
              title: 'Totalmente Gratuito',
              desc: 'Sin costo alguno para la comunidad',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-[2rem] shadow-lg hover:shadow-xl border border-gray-100 text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-400 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-3">{item.title}</h3>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100"
          >
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
                <p className="text-gray-500 mb-8">
                  Hemos recibido tu solicitud. Un miembro de nuestro equipo te contactará pronto
                  para confirmar el horario.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-pink-400 text-white font-bold rounded-full hover:scale-105 transition-all"
                >
                  Agendar otra cita
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-secondary ml-2 uppercase tracking-wider">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      placeholder="Tu nombre"
                      value={formData.client_name}
                      onChange={(e) => updateField('client_name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-secondary ml-2 uppercase tracking-wider">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      placeholder="tu@email.com"
                      value={formData.client_email}
                      onChange={(e) => updateField('client_email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-secondary ml-2 uppercase tracking-wider">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      placeholder="+57 300 000 0000"
                      value={formData.client_phone}
                      onChange={(e) => updateField('client_phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-secondary ml-2 uppercase tracking-wider">
                      Fecha y Hora Preferida *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      value={formData.datetime}
                      onChange={(e) => updateField('datetime', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-secondary ml-2 uppercase tracking-wider">
                    ¿Cuál es el motivo de tu consulta? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-6 py-4 rounded-3xl border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                    placeholder="Cuéntanos brevemente en qué podemos ayudarte..."
                    value={formData.reason}
                    onChange={(e) => updateField('reason', e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-5 bg-gradient-to-r from-primary to-pink-400 text-white font-bold rounded-2xl text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      Solicitar Asesoría
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
