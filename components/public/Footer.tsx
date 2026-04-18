import Link from 'next/link';
import { Heart, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                <Heart size={18} fill="currentColor" />
              </div>
              <span className="text-xl font-bold font-primary text-secondary">
                Azulanza
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Brindando esperanza y apoyo integral a nuestra comunidad a través de la salud mental y la solidaridad.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-secondary mb-6">Explorar</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="/noticias" className="hover:text-primary transition-colors">Noticias</Link></li>
              <li><Link href="/asesoria" className="hover:text-primary transition-colors">Asesoría Psicológica</Link></li>
              <li><Link href="/donaciones" className="hover:text-primary transition-colors">Donaciones</Link></li>
              <li><Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-secondary mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Barranquilla, Colombia</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>fundacion@azulanza.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="font-bold text-secondary mb-6">Únete a nosotros</h4>
            <p className="text-sm text-gray-500 mb-4">
              Suscríbete para recibir noticias y actualizaciones de nuestra labor.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="bg-secondary text-white rounded-full p-2 hover:bg-primary transition-colors">
                <Heart size={18} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Fundación Azulanza. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/terminos" className="hover:text-primary">Términos y Condiciones</Link>
            <Link href="/privacidad" className="hover:text-primary">Política de Privacidad</Link>
            <Link href="/admin/login" className="hover:text-primary">Acceso Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
