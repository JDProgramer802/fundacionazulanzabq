'use client';

import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, Phone, Send, Twitter } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Suscribiendo...' });
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus({ type: 'success', message: '¡Suscrito con éxito!' });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: 'Error al suscribirse' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error de conexión' });
    }
  };

  return (
    <footer className="bg-[#fafcff] pt-32 pb-12 relative overflow-hidden">
      {/* Abstract Background for Footer */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-0 left-10 w-96 h-96 bg-primary rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ scale: 1.05 }} className="relative w-48 h-16">
                <NextImage
                  src="/logo.png"
                  alt="Fundación Azulanza"
                  fill
                  className="object-contain object-left"
                />
              </motion.div>
            </Link>
            <p className="text-gray-500 text-xl font-light leading-relaxed max-md">
              Transformando el dolor en esperanza a través de la salud mental y la solidaridad
              incondicional.
            </p>
            <div className="flex gap-6">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/20"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-secondary text-lg mb-8 font-primary uppercase tracking-widest">
              Explorar
            </h4>
            <ul className="space-y-4 text-gray-500">
              {['Inicio', 'Nosotros', 'Noticias', 'Asesoría', 'Donaciones', 'Contacto'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={
                        item === 'Inicio'
                          ? '/'
                          : `/${item
                              .toLowerCase()
                              .normalize('NFD')
                              .replace(/[\u0300-\u036f]/g, '')}`
                      }
                      className="hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-4 h-0.5 bg-primary transition-all duration-300" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-secondary text-lg mb-8 font-primary uppercase tracking-widest">
              Boletín
            </h4>
            <p className="text-gray-500 text-sm mb-6 font-light">
              Suscríbete para recibir noticias y recursos de salud mental.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:border-primary transition-all text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="absolute right-1.5 top-1.5 w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
              {status.message && (
                <p
                  className={`text-xs font-bold ${status.type === 'success' ? 'text-green-500' : 'text-primary'}`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3">
            <div className="glass p-8 rounded-[2.5rem] border border-white/60">
              <h4 className="font-bold text-secondary text-lg mb-8 font-primary uppercase tracking-widest">
                Hablemos
              </h4>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Phone size={18} />
                  </div>
                  <span className="text-gray-500 pt-2 font-bold text-sm">+57 322 721 2546</span>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <Mail size={18} />
                  </div>
                  <span className="text-gray-500 pt-2 text-sm">fundacion@azulanza.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-400 text-sm font-light">
            © {new Date().getFullYear()} Fundación Azulanza. Diseñado con ❤️ para la comunidad.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <Link href="/terminos" className="hover:text-primary transition-colors">
              Términos
            </Link>
            <Link href="/privacidad" className="hover:text-primary transition-colors">
              Privacidad
            </Link>
            <Link
              href="/admin/login"
              className="px-4 py-1 border border-gray-200 rounded-full hover:border-primary hover:text-primary transition-all"
            >
              Panel Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
