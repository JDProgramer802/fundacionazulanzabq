'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2, Image as ImageIcon, Upload, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: string;
  active: boolean;
}

const CATEGORIES = ['General', 'Jornadas', 'Eventos', 'Comunidad', 'Sede'];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'General',
    active: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setItems(data);
      } else {
        console.error('Invalid gallery response:', data);
        if (res.status === 503) {
          setError(
            'La base de datos está tardando demasiado en responder (Timeout). Por favor, intenta de nuevo.'
          );
        } else {
          setError(data?.error || 'Error al cargar la galería.');
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const res = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });
      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, image_url: data.url });
      }
    } catch (err) {
      alert('Error al subir imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setShowModal(false);
      setEditingId(null);
      setFormData({ title: '', description: '', image_url: '', category: 'General', active: true });
      fetchItems();
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      image_url: item.image_url,
      category: item.category,
      active: item.active,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar esta imagen de la galería?')) {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      fetchItems();
    }
  };

  const toggleActive = async (item: GalleryItem) => {
    await fetch(`/api/gallery/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, active: !item.active }),
    });
    fetchItems();
  };

  if (loading)
    return (
      <div className="flex justify-center flex-col items-center py-20 gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-gray-400 font-medium">Cargando galería...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 bg-red-50 rounded-[3rem] border border-red-100 flex flex-col items-center">
        <ImageIcon size={48} className="text-red-300 mb-4" />
        <p className="text-red-500 font-bold mb-4">{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            setError(null);
            fetchItems();
          }}
          className="btn-primary"
        >
          Reintentar
        </button>
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center text-left">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-primary">Galería Fotográfica</h1>
          <p className="text-gray-500">Gestiona las fotos y momentos de la fundación</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: '',
              description: '',
              image_url: '',
              category: 'General',
              active: true,
            });
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} /> Nueva Imagen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {Array.isArray(items) &&
            items.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group relative"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.title || 'Gallery item'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-3 bg-white text-secondary rounded-full hover:bg-primary hover:text-white transition-all shadow-lg"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-3 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-secondary shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => toggleActive(item)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition-all ${
                        item.active ? 'bg-green-500/90 text-white' : 'bg-gray-100/90 text-gray-400'
                      }`}
                    >
                      <Check size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-secondary truncate">
                    {item.title || 'Sin título'}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-1">
                    {item.description || 'Sin descripción'}
                  </p>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold text-secondary">
                  {editingId ? 'Editar Imagen' : 'Nueva Imagen'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-secondary p-2 bg-gray-50 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Título (Opcional)
                      </label>
                      <input
                        type="text"
                        className="w-full px-5 py-3 rounded-2xl border border-gray-100 outline-none focus:border-primary bg-gray-50/50"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Momento en la jornada..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Categoría
                      </label>
                      <select
                        className="w-full px-5 py-3 rounded-2xl border border-gray-100 outline-none focus:border-primary bg-gray-50/50 appearance-none"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Descripción (Opcional)
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-5 py-3 rounded-2xl border border-gray-100 outline-none focus:border-primary bg-gray-50/50 resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Detalles sobre esta foto..."
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Fotografía *
                    </label>
                    <label className="cursor-pointer block">
                      <div className="relative aspect-video rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50 group overflow-hidden flex flex-col items-center justify-center hover:border-primary hover:bg-primary/5 transition-all">
                        {formData.image_url ? (
                          <>
                            <Image
                              src={formData.image_url}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <p className="text-white font-bold text-sm">Cambiar Imagen</p>
                            </div>
                          </>
                        ) : (
                          <>
                            {uploading ? (
                              <Loader2 className="animate-spin text-primary" size={32} />
                            ) : (
                              <>
                                <Upload size={32} className="text-gray-300 mb-2" />
                                <p className="text-xs text-gray-500 font-medium">
                                  Click para seleccionar
                                </p>
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      />
                    </label>
                    <p className="text-[10px] text-gray-400 text-center italic">
                      Recomendado: 1200x800px o superior
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-4 border border-gray-100 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || !formData.image_url}
                    className="flex-1 btn-primary py-4 disabled:opacity-50"
                  >
                    {editingId ? 'Guardar Cambios' : 'Subir a Galería'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
