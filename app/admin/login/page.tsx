'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Heart, Loader2, Lock, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = '/admin';
      } else {
        setError(data.error || 'Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row overflow-hidden">
      {/* Lado Izquierdo: Visual/Inspiracional */}
      <div className="hidden md:flex md:w-1/2 bg-secondary relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,#EE84B522,transparent_50%)]" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 text-white max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-10 border border-white/20 shadow-2xl"
          >
            <Heart size={40} fill="white" className="text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold font-primary mb-6 leading-tight"
          >
            Gestiona la esperanza de nuestra <span className="text-primary">comunidad</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-blue-100/80 font-light leading-relaxed"
          >
            Bienvenido al panel administrativo de la Fundación Azulanza. Aquí es donde transformamos
            la solidaridad en impacto real.
          </motion.p>
        </div>

        {/* Decoración inferior */}
        <div className="absolute bottom-10 left-12 flex items-center gap-4 text-blue-100/40 text-sm">
          <ShieldCheck size={18} />
          <span>Acceso restringido a personal autorizado</span>
        </div>
      </div>

      {/* Lado Derecho: Formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        {/* Enlace para volver al sitio público en móvil */}
        <div className="absolute top-8 right-8">
          <Link
            href="/"
            className="text-sm font-bold text-secondary hover:text-primary transition-colors flex items-center gap-2"
          >
            Volver al sitio <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-secondary font-primary mb-3">Iniciar Sesión</h1>
            <p className="text-gray-500">Ingresa tus credenciales para acceder al panel.</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 text-red-500 p-5 rounded-[1.5rem] text-sm mb-8 border border-red-100 flex items-center gap-3 shadow-sm"
            >
              <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center shrink-0">
                <Lock size={16} />
              </div>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Correo Electrónico</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-gray-300"
                  placeholder="admin@azulanza.org"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Contraseña</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-gray-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded-lg border-gray-200 text-primary focus:ring-primary transition-all"
                />
                <span className="text-sm text-gray-500 group-hover:text-secondary transition-colors">
                  Recordarme
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-bold text-primary hover:text-secondary transition-colors"
              >
                ¿Olvidaste tu clave?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-5 text-lg shadow-2xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Entrar al Panel{' '}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400 font-light">
              © {new Date().getFullYear()} Fundación Azulanza. Sistema de Gestión Interna.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
