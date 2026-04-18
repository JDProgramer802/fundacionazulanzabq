'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, CheckCircle, XCircle, HelpCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

export default function FAQAdmin() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
    active: true
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const res = await fetch('/api/faqs');
    const data = await res.json();
    setFaqs(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/faqs/${editingId}` : '/api/faqs';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setShowModal(false);
      setEditingId(null);
      setFormData({ question: '', answer: '', order: 0, active: true });
      fetchFaqs();
    }
  };

  const handleEdit = (f: FAQ) => {
    setEditingId(f.id);
    setFormData({
      question: f.question,
      answer: f.answer,
      order: f.order,
      active: f.active
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar esta pregunta?')) {
      await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      fetchFaqs();
    }
  };

  const toggleActive = async (f: FAQ) => {
    await fetch(`/api/faqs/${f.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...f, active: !f.active }),
    });
    fetchFaqs();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={48} /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-primary">Preguntas Frecuentes</h1>
          <p className="text-gray-500">Administra las preguntas más comunes de los usuarios</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ question: '', answer: '', order: faqs.length, active: true });
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} /> Nueva Pregunta
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((f) => (
          <motion.div
            layout
            key={f.id}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start justify-between group"
          >
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100/50 rounded-xl flex items-center justify-center text-blue-600">
                <HelpCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-secondary text-lg mb-2">{f.question}</h4>
                <p className="text-gray-500 leading-relaxed text-sm max-w-3xl">{f.answer}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Orden: {f.order}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => toggleActive(f)} className={f.active ? "text-green-500" : "text-gray-300"}>
                {f.active ? <CheckCircle size={18} /> : <XCircle size={18} />}
              </button>
              <button onClick={() => handleEdit(f)} className="text-gray-400 hover:text-primary"><Edit2 size={18} /></button>
              <button onClick={() => handleDelete(f.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
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
              <h2 className="text-2xl font-bold text-secondary mb-6">{editingId ? 'Editar Pregunta' : 'Nueva Pregunta'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Pregunta</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Respuesta</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary"
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Orden de aparición</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-primary"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500">Cancelar</button>
                  <button type="submit" className="flex-1 btn-primary py-3">Guardar</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
