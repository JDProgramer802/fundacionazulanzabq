import { Facebook, Heart, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 relative overflow-hidden">
      {/* Abstract Background for Footer */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
         <div className="absolute top-0 left-10 w-96 h-96 bg-primary rounded-full blur-[100px]" />
         <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-brand rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 transition-transform group-hover:rotate-12">
                <Heart size={24} fill="currentColor" />
              </div>
              <span className="text-3xl font-bold font-primary tracking-tighter text-secondary">
                Azulanza
              </span>
            </Link>
            <p className="text-gray-500 text-xl font-light leading-relaxed max-md">
              Transformando el dolor en esperanza a través de la salud mental y la solidaridad incondicional.
            </p>
            <div className="flex gap-6">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-secondary hover:bg-primary hover:text-white hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/20">
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-secondary text-lg mb-8 font-primary uppercase tracking-widest">Explorar</h4>
            <ul className="space-y-4 text-gray-500">
              {['Inicio', 'Noticias', 'Asesoría', 'Donaciones', 'Contacto'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Inicio' ? '/' : `/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-primary transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-5">
             <div className="bg-[#F9FAFB] p-10 rounded-[3rem] border border-gray-100">
                <h4 className="font-bold text-secondary text-lg mb-8 font-primary uppercase tracking-widest">Hablemos</h4>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                      <MapPin size={20} />
                    </div>
                    <span className="text-gray-500 pt-2">Barranquilla, Colombia - Sede Principal</span>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Phone size={20} />
                    </div>
                    <span className="text-gray-500 pt-2 font-bold text-lg">+57 300 123 4567</span>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                      <Mail size={20} />
                    </div>
                    <span className="text-gray-500 pt-2">fundacion@azulanza.org</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-400 text-sm font-light">© {new Date().getFullYear()} Fundación Azulanza. Diseñado con ❤️ para la comunidad.</p>
          <div className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <Link href="/terminos" className="hover:text-primary transition-colors">Términos</Link>
            <Link href="/privacidad" className="hover:text-primary transition-colors">Privacidad</Link>
            <Link href="/admin/login" className="px-4 py-1 border border-gray-200 rounded-full hover:border-primary hover:text-primary transition-all">Panel Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
