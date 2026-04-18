'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, CheckCircle, XCircle, Quote, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  image_url: string | null;
  active: boolean;
}

export default function TestimoniosAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    image_url: '',
    active: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const res = await fetch('/api/testimonials');
    const data = await res.json();
    setTestimonials(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setShowModal(false);
      setEditingId(null);
      setFormData({ name: '', role: '', text: '', image_url: '', active: true });
      fetchTestimonials();
    }
  };

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setFormData({
      name: t.name,
      role: t.role || '',
      text: t.text,
      image_url: t.image_url || '',
      active: t.active,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este testimonio?')) {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      fetchTestimonials();
    }
  };

  const toggleActive = async (t: Testimonial) => {
    await fetch(`/api/testimonials/${t.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...t, active: !t.active }),
    });
    fetchTestimonials();
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-primary">Testimonios</h1>
          <p className="text-gray-500">Gestiona las historias de éxito de la fundación</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', role: '', text: '', image_url: '', active: true });
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} /> Nuevo Testimonio
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <motion.div
            layout
            key={t.id}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Quote size={24} />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive(t)}
                  className={t.active ? 'text-green-500' : 'text-gray-300'}
                >
                  {t.active ? <CheckCircle size={18} /> : <XCircle size={18} />}
                </button>
                <button onClick={() => handleEdit(t)} className="text-gray-400 hover:text-primary">
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-6 italic leading-relaxed">"{t.text}"</p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 overflow-hidden">
                {t.image_url ? (
                  <img src={t.image_url} alt={t.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={20} />
                )}
              </div>
              <div>
                <h4 className="font-bold text-secondary">{t.name}</h4>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-secondary mb-6">
                {editingId ? 'Editar Testimonio' : 'Nuevo Testimonio'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Rol</label>
                    <input
                      type="text"
                      placeholder="Ej: Beneficiario"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Testimonio</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    URL Imagen (Opcional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 btn-primary py-3">
                    Guardar
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
