'use client';

import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { useFormHandler } from '@/hooks/use-form-handler';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

export default function ContactPage() {
  const { formData, status, setStatus, updateField, handleSubmit } = useFormHandler({
    initialData: { name: '', email: '', message: '' },
    endpoint: '/api/contact',
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/50 to-white relative">
      <AnimatedBackground primaryColor="bg-primary/10" secondaryColor="bg-secondary/10" />

      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-secondary/10 to-blue-300/10 rounded-full text-secondary font-bold text-sm mb-8 border border-secondary/20">
            <MessageCircle size={16} />
            Estamos Aquí para Escucharte
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-secondary mb-8 font-primary">
            <span className="gradient-text">Contáctanos</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            ¿Tienes dudas, sugerencias o quieres sumarte a nuestra causa? Tu mensaje es importante para nosotros. Responderemos lo antes posible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Contact Info Cards */}
          {[
            { icon: Mail, title: "Escríbenos", content: "fundacionazulanza@gmail.com", action: "mailto:fundacionazulanza@gmail.com" },
            { icon: Phone, title: "Llámanos", content: "+57 322 721 2546", action: "tel:+573227212546" },
            { icon: MapPin, title: "Ubicación", content: "Barranquilla, Colombia", action: null }
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.action || "#"}
              onClick={(e) => !item.action && e.preventDefault()}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-secondary transition-colors">{item.title}</h3>
              <p className="text-gray-500 font-semibold">{item.content}</p>
            </motion.a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
              <h3 className="text-3xl font-bold text-secondary mb-6">Preguntas Frecuentes</h3>
              <div className="space-y-6">
                {[
                  { q: "¿Cómo puedo ser voluntario?", a: "Puedes postularte en nuestra sección de voluntariado completando el formulario." },
                  { q: "¿Las asesorías tienen costo?", a: "No, todas nuestras asesorías profesionales son completamente gratuitas." },
                  { q: "¿Dónde están ubicados?", a: "Nuestra sede principal está en Barranquilla, pero brindamos apoyo a nivel nacional." }
                ].map((faq, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-secondary mb-2">{faq.q}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100"
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
                <h2 className="text-3xl font-bold text-secondary mb-4">¡Mensaje Enviado!</h2>
                <p className="text-gray-500 mb-8">
                  Gracias por contactarnos. Te responderemos lo más pronto posible a tu correo electrónico.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-gradient-to-r from-secondary to-blue-600 text-white font-bold rounded-full hover:scale-105 transition-all"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary ml-4">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    className="w-full px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-secondary transition-all"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary ml-4">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    className="w-full px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-secondary transition-all"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary ml-4">Mensaje</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-8 py-5 rounded-[2rem] border border-gray-200 outline-none focus:border-secondary transition-all resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-5 bg-gradient-to-r from-secondary to-blue-600 text-white font-bold rounded-full text-lg shadow-xl shadow-secondary/20 hover:shadow-2xl hover:shadow-secondary/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
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

