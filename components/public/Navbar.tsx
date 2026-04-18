'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/asesoria', label: 'Asesoría' },
  { href: '/donaciones', label: 'Donaciones' },
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
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        scrolled ? 'bg-white/70 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] py-3' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 bg-gradient-brand rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20"
          >
            <Heart size={24} fill="currentColor" />
          </motion.div>
          <span className={cn(
            "text-3xl font-bold font-primary tracking-tighter transition-colors",
            scrolled ? "text-secondary" : "text-secondary"
          )}>
            Azulanza
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-bold text-sm uppercase tracking-widest transition-all hover:text-primary relative group",
                pathname === link.href ? "text-primary" : "text-secondary/70"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute -bottom-2 left-0 h-1 bg-primary transition-all duration-300 rounded-full",
                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
          <Link href="/donaciones" className="btn-primary py-3 px-8 shadow-lg shadow-primary/20">
            Donar Ahora
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-secondary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium py-2 border-b border-gray-50",
                    pathname === link.href ? "text-primary" : "text-gray-600"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/donaciones"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-center mt-2"
              >
                Donar Ahora
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
