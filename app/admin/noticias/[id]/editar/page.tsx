'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Upload, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function EditNewsPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/news/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      });
  }, [params.id]);

  const handleFileUpload = async (file: File) => {
    try {
      const res = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });
      const data = await res.json();
      if (data.url) {
        setFormData((prev: any) => ({ ...prev, image_url: data.url }));
      }
    } catch (err) {
      alert('Error al subir imagen');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/news/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/admin/noticias');
        router.refresh();
      }
    } catch (err) {
      alert('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/noticias" className="p-2 hover:bg-white rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-secondary font-primary">Editar Noticia</h1>
          <p className="text-gray-500">Actualiza el contenido de la publicación</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6"
      >
        <div className="space-y-2">
          <label className="block text-sm font-bold text-secondary">Título de la noticia</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary text-lg"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-secondary">Imagen Destacada</label>
          <div className="flex items-center gap-4">
            <div className="w-40 h-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
              {formData.image_url ? (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="text-gray-300" />
              )}
            </div>
            <input
              type="file"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-secondary">Extracto (Resumen corto)</label>
          <textarea
            value={formData.excerpt || ''}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary h-20"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-secondary">Contenido de la Noticia</label>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary h-96 font-serif"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-700">
            Publicar noticia
          </label>
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <Link
            href="/admin/noticias"
            className="px-6 py-3 rounded-full font-bold text-gray-500 hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </Link>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}
