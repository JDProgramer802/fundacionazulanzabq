'use client';

import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { useFormHandler } from '@/hooks/use-form-handler';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Heart, Landmark, Loader2, QrCode, Upload, Zap } from 'lucide-react';

export default function DonacionesPage() {
  const { formData, status, setStatus, updateField, handleSubmit } = useFormHandler({
    initialData: {
      donor_name: '',
      donor_email: '',
      amount: '',
      receipt_image: '',
    },
    endpoint: '/api/donations',
  });

  const handleFileUpload = async (file: File) => {
    try {
      const res = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });
      const data = await res.json();
      if (data.url) {
        updateField('receipt_image', data.url);
      }
    } catch (err) {
      alert('Error al subir comprobante');
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.receipt_image) {
      alert('Por favor sube el comprobante de transferencia');
      return;
    }
    handleSubmit();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-primary/5 to-white relative">
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
            Cada peso cuenta para salvar vidas
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-secondary mb-8 font-primary">
            Tu <span className="gradient-text">Generosidad</span> Nos Impulsa
          </h1>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Con tu apoyo mantenemos asesorías psicológicas gratuitas, jornadas de salud mental y
            programas de apoyo comunitario. Juntos transformamos vidas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto mb-20">
          {/* Instructions & Impact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* How to Donate */}
            <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />

              <h3 className="text-3xl font-bold text-secondary mb-10 flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-pink-400 rounded-full flex items-center justify-center text-white">
                  <Landmark size={24} />
                </div>
                ¿Cómo Donar?
              </h3>

              <div className="space-y-6 relative z-10">
                {[
                  {
                    step: 1,
                    title: 'Escanea el QR',
                    desc: 'Abre tu app bancaria (Bancolombia, Nequi, Daviplata) y escanea nuestro código.',
                  },
                  {
                    step: 2,
                    title: 'Realiza la Transferencia',
                    desc: 'Envía la cantidad que desees a nuestra cuenta verificada.',
                  },
                  {
                    step: 3,
                    title: 'Reporta tu Donación',
                    desc: 'Completa el formulario adjuntando el comprobante.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-pink-400 text-white flex items-center justify-center font-bold text-lg">
                        {item.step}
                      </div>
                      {item.step < 3 && (
                        <div className="absolute top-10 left-5 w-0.5 h-8 bg-gradient-to-b from-primary to-pink-400" />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-secondary">{item.title}</p>
                      <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-gradient-to-br from-primary/10 to-pink-300/10 rounded-[3rem] p-12 border border-primary/20 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-50 blur-3xl bg-gradient-to-br from-primary to-pink-400"></div>
              <div className="w-64 h-64 bg-white rounded-3xl flex items-center justify-center relative z-10 shadow-2xl">
                <QrCode size={180} className="text-secondary" />
              </div>
              <p className="text-xs text-gray-600 text-center mt-6 relative z-10 font-semibold">
                Fundación Azulanza
                <br />
                NIT: 901.645.631-4
                <br />
                Bancolombia Ahorros
              </p>
            </div>

            {/* Transparency Banner */}
            <div className="bg-gradient-to-r from-secondary via-blue-600 to-secondary rounded-[3rem] p-10 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
              <div className="relative z-10 flex items-start gap-4">
                <Zap size={32} className="text-yellow-300 shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold mb-2">Transparencia Total</h4>
                  <p className="text-blue-100">
                    100% de las donaciones se destinan a asesorías psicológicas, jornadas de salud y
                    apoyo comunitario.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Report Form */}
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
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-secondary mb-4">¡Gracias de Corazón!</h2>
                  <p className="text-gray-500 mb-8 leading-relaxed">
                    Tu donación ha sido recibida. Te enviaremos un certificado de donación a tu
                    correo electrónico.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-pink-400 text-white font-bold rounded-full hover:scale-105 transition-all"
                  >
                    Realizar otra donación
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onFormSubmit} className="space-y-6">
                  <h2 className="text-3xl font-bold text-secondary mb-8">Reportar Donación</h2>

                  <div>
                    <label className="block text-sm font-bold text-secondary mb-3">
                      Nombre del Donante *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.donor_name}
                      onChange={(e) => updateField('donor_name', e.target.value)}
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
                      placeholder="Tu nombre o empresa..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-secondary mb-3">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.donor_email}
                      onChange={(e) => updateField('donor_email', e.target.value)}
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-secondary mb-3">
                      Monto Donado ($ COP) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                        $
                      </span>
                      <input
                        type="number"
                        required
                        value={formData.amount}
                        onChange={(e) => updateField('amount', e.target.value)}
                        className="w-full pl-8 pr-5 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none transition-all focus:ring-2 focus:ring-primary/20"
                        placeholder="50,000"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-bold text-secondary">
                      Comprobante (Imagen/PDF) *
                    </label>
                    <label className="cursor-pointer">
                      <div className="relative w-full h-40 bg-gradient-to-br from-primary/5 to-pink-300/5 rounded-2xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center hover:border-primary hover:bg-primary/5 transition-all group">
                        {formData.receipt_image ? (
                          <div className="relative w-full h-full">
                            <img
                              src={formData.receipt_image}
                              alt="Comprobante"
                              className="w-full h-full object-contain p-2 rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <p className="text-white font-bold">Cambiar imagen</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="text-primary mb-2" size={32} />
                            <span className="text-sm font-semibold text-secondary">
                              Sube tu comprobante
                            </span>
                            <span className="text-xs text-gray-400">PNG, JPG o PDF</span>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                        className="hidden"
                        accept="image/*,.pdf"
                      />
                    </label>
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
                        Reportar Donación
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
