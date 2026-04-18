'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Calendar, MapPin, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string | null;
  image_url: string | null;
}

export default function EventosAdmin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image_url: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch('/api/events');
    const data = await res.json();
    setEvents(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/events/${editingId}` : '/api/events';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setShowModal(false);
      setEditingId(null);
      setFormData({ title: '', description: '', date: '', location: '', image_url: '' });
      fetchEvents();
    }
  };

  const handleEdit = (ev: Event) => {
    setEditingId(ev.id);
    setFormData({
      title: ev.title,
      description: ev.description,
      date: new Date(ev.date).toISOString().split('T')[0],
      location: ev.location || '',
      image_url: ev.image_url || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar este evento?')) {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
      fetchEvents();
    }
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
          <h1 className="text-3xl font-bold text-secondary font-primary">Eventos</h1>
          <p className="text-gray-500">Calendario de actividades públicas de la fundación</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ title: '', description: '', date: '', location: '', image_url: '' });
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} /> Nuevo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <motion.div
            layout
            key={ev.id}
            className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden group"
          >
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              {ev.image_url ? (
                <img
                  src={ev.image_url}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <ImageIcon size={48} />
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => handleEdit(ev)}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary shadow-lg"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(ev.id)}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-red-500 shadow-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                <Calendar size={14} />
                {new Date(ev.date).toLocaleDateString()}
              </div>
              <h3 className="text-xl font-bold text-secondary mb-2">{ev.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">{ev.description}</p>
              {ev.location && (
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <MapPin size={14} />
                  {ev.location}
                </div>
              )}
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
                {editingId ? 'Editar Evento' : 'Nuevo Evento'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Fecha</label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Ubicación</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Descripción</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">URL Imagen</label>
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
                    className="flex-1 py-3 border border-gray-100 rounded-xl font-bold text-gray-500"
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
