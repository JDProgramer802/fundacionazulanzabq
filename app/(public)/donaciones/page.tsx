'use client';

import { useState } from 'react';
import { Heart, Upload, CheckCircle2, Loader2, Landmark, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DonacionesPage() {
  const [formData, setFormData] = useState({
    donor_name: '',
    donor_email: '',
    amount: '',
    receipt_image: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleFileUpload = async (file: File) => {
    try {
      const res = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });
      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, receipt_image: data.url }));
      }
    } catch (err) {
      alert('Error al subir comprobante');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.receipt_image) {
      alert('Por favor sube el comprobante de transferencia');
      return;
    }
    setStatus('loading');
    
    try {
      const res = await fetch('/api/donations', {
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
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm mb-6">
            <Heart size={16} fill="currentColor" />
            Cada peso cuenta para salvar vidas
          </div>
          <h1 className="text-5xl font-bold text-secondary mb-6 font-primary">Tu Generosidad nos Impulsa</h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Gracias a tus donaciones podemos mantener nuestras jornadas de salud, asesorías psicológicas y apoyo comunitario. 
            Ayúdanos a seguir transformando vidas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Instructions & QR */}
          <div className="space-y-8">
            <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100">
               <h3 className="text-2xl font-bold text-secondary mb-8 flex items-center gap-3">
                 <Landmark className="text-primary" /> ¿Cómo donar?
               </h3>
               
               <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <p className="font-bold text-secondary">Escanea el código QR</p>
                      <p className="text-gray-500 text-sm">Abre tu app bancaria (Bancolombia, Nequi, Daviplata) y escanea nuestro QR.</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                     <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                        <QrCode size={120} className="text-secondary" />
                        {/* Aquí iría la imagen del QR real administrable */}
                     </div>
                     <p className="text-xs text-gray-400 text-center">Bancolombia Ahorros: 123-456789-01<br/>Fundación Azulanza - NIT: 900.XXX.XXX</p>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <p className="font-bold text-secondary">Reporta tu donación</p>
                      <p className="text-gray-500 text-sm">Completa el formulario a la derecha adjuntando el comprobante para que podamos agradecerte.</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-secondary rounded-[3rem] p-10 text-white overflow-hidden relative">
               <h3 className="text-2xl font-bold mb-4 relative z-10">Transparencia Total</h3>
               <p className="text-blue-100 mb-0 relative z-10">
                 Todas las donaciones son auditadas y destinadas 100% a la ejecución de nuestros programas sociales.
               </p>
               <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Report Form */}
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-50">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-bold text-secondary mb-4">¡Gracias de corazón!</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Tu reporte ha sido recibido. Verificaremos la transferencia y te enviaremos un certificado de donación a tu correo.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="btn-primary"
                >
                  Reportar otra donación
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-secondary mb-6">Reportar Transferencia</h3>
                
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">Nombre del Donante</label>
                  <input
                    type="text"
                    required
                    value={formData.donor_name}
                    onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    placeholder="Tu nombre o empresa..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={formData.donor_email}
                    onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    placeholder="Para enviarte el agradecimiento"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">Monto Donado ($ COP)</label>
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                    placeholder="Ej: 50000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-secondary">Comprobante (Imagen/PDF)</label>
                  <div className="flex items-center gap-4">
                    <div className="w-full h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden">
                      {formData.receipt_image ? (
                        <div className="relative w-full h-full">
                          <img src={formData.receipt_image} alt="Comprobante" className="w-full h-full object-contain p-2" />
                        </div>
                      ) : (
                        <>
                          <Upload className="text-gray-300 mb-2" />
                          <span className="text-xs text-gray-400">Haz clic para subir comprobante</span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      required
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="absolute inset-0 opacity-0 cursor-pointer h-32"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium">Error al reportar. Por favor intenta de nuevo.</p>
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
                      <Heart size={20} fill="currentColor" /> Reportar Donación
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
