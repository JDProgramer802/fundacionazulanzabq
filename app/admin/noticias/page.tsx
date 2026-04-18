'use client';

import { api } from '@/lib/api-client';
import { formatDate } from '@/lib/utils';
import { Edit2, Eye, Loader2, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminNewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await api.get('/api/news');
    if (Array.isArray(data)) setNews(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta noticia?')) return;

    const { error } = await api.delete(`/api/news/${id}`);
    if (!error) {
      setNews(news.filter((n) => n.id !== id));
    } else {
      alert('Error al eliminar: ' + error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-primary">Noticias</h1>
          <p className="text-gray-500">Gestiona las publicaciones del blog</p>
        </div>
        <Link href="/admin/noticias/nueva" className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Nueva Noticia
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-8 py-4 font-bold">Imagen</th>
              <th className="px-8 py-4 font-bold">Título</th>
              <th className="px-8 py-4 font-bold">Fecha</th>
              <th className="px-8 py-4 font-bold">Estado</th>
              <th className="px-8 py-4 font-bold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {news.map((n) => (
              <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-4">
                  <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden">
                    {n.image_url ? (
                      <img src={n.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Eye size={16} />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-8 py-4">
                  <p className="font-bold text-secondary line-clamp-1">{n.title}</p>
                  <p className="text-xs text-gray-400">/{n.slug}</p>
                </td>
                <td className="px-8 py-4 text-sm text-gray-500">{formatDate(n.created_at)}</td>
                <td className="px-8 py-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${n.published ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {n.published ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td className="px-8 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/noticias/${n.id}/editar`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(n.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {news.length === 0 && (
          <div className="p-12 text-center text-gray-500 italic">No hay noticias creadas aún.</div>
        )}
      </div>
    </div>
  );
}
