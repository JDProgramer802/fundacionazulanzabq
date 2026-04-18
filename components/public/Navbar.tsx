'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/asesoria', label: 'Asesoría' },
  { href: '/donaciones', label: 'Donaciones' },
  { href: '/voluntariado', label: 'Voluntariado' },
  { href: '/preguntas', label: 'FAQ' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 w-full z-50 px-4 py-4 md:px-8">
      <nav
        className={cn(
          'container mx-auto transition-all duration-500 ease-in-out',
          scrolled
            ? 'bg-white/70 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] py-3 px-6 md:px-10 rounded-[2.5rem] border border-white/20'
            : 'bg-transparent py-4 px-4'
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="w-10 h-10 md:w-12 md:h-12 bg-gradient-brand rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20"
            >
              <Heart size={20} fill="currentColor" className="md:w-6 md:h-6" />
            </motion.div>
            <span className={cn(
              "text-2xl md:text-3xl font-bold font-primary tracking-tighter transition-colors",
              "text-secondary"
            )}>
              Azulanza
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-gray-50/50 p-1.5 rounded-full border border-gray-100/50">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all relative group overflow-hidden",
                    pathname === link.href
                      ? "text-white"
                      : "text-secondary/60 hover:text-primary"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {pathname === link.href && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-primary shadow-lg shadow-primary/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <Link href="/donaciones" className="btn-primary py-3 px-8 text-sm shadow-lg shadow-primary/20">
              Donar Ahora
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-secondary bg-white/50 rounded-full border border-gray-100 shadow-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="lg:hidden mt-4 bg-white/95 backdrop-blur-2xl rounded-[2rem] border border-gray-100 shadow-2xl overflow-hidden p-4"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-bold py-4 px-6 rounded-2xl transition-all",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-secondary/70 hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-50 mt-2">
                  <Link
                    href="/donaciones"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full text-center py-4"
                  >
                    Donar Ahora
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
