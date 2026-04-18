'use client';

import { cn } from '@/lib/utils';
import {
  Calendar,
  FileText,
  HeartHandshake,
  HelpCircle,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Newspaper,
  Quote,
  Settings,
  UserCheck,
  Users,
} from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/contenido', label: 'Contenido', icon: FileText },
  { href: '/admin/galeria', label: 'Galería', icon: ImageIcon },
  { href: '/admin/noticias', label: 'Noticias', icon: Newspaper },
  { href: '/admin/eventos', label: 'Eventos', icon: Calendar },
  { href: '/admin/citas', label: 'Citas', icon: Calendar },
  { href: '/admin/donaciones', label: 'Donaciones', icon: HeartHandshake },
  { href: '/admin/contacto', label: 'Mensajes', icon: MessageSquare },
  { href: '/admin/voluntarios', label: 'Voluntarios', icon: UserCheck },
  { href: '/admin/testimonios', label: 'Testimonios', icon: Quote },
  { href: '/admin/faqs', label: 'Preguntas', icon: HelpCircle },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { href: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/admin" className="relative w-full h-12 block">
            <NextImage
              src="/logo.png"
              alt="Azulanza Admin"
              fill
              className="object-contain object-left"
            />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                pathname === item.href
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-secondary'
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 md:hidden">
          {/* Mobile header could go here */}
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
