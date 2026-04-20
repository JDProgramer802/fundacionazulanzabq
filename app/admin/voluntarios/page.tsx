'use client';

import { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Calendar,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  UserCheck,
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  interests: string | null;
  status: string;
  created_at: string;
}

export default function VoluntariosAdmin() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await fetch('/api/volunteers');
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setVolunteers(data);
      } else {
        setError(data?.error || 'Error al cargar los voluntarios.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/volunteers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchVolunteers();
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Eliminar registro de voluntario?')) {
      await fetch(`/api/volunteers/${id}`, { method: 'DELETE' });
      fetchVolunteers();
    }
  };

  if (loading)
    return (
      <div className="flex justify-center flex-col items-center py-20 gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-gray-400 font-medium">Cargando voluntarios...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 bg-red-50 rounded-[3rem] border border-red-100 flex flex-col items-center">
        <UserCheck size={48} className="text-red-300 mb-4" />
        <p className="text-red-500 font-bold mb-4">{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            setError(null);
            fetchVolunteers();
          }}
          className="btn-primary"
        >
          Reintentar
        </button>
      </div>
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary font-primary">Gestión de Voluntarios</h1>
        <p className="text-gray-500">
          Administra las solicitudes de personas interesadas en ayudar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(volunteers) &&
          volunteers.map((v) => (
            <motion.div
              layout
              key={v.id}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                  <UserCheck size={24} />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedVolunteer(v);
                      setShowModal(true);
                    }}
                    className="text-gray-400 hover:text-primary"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-secondary mb-1">{v.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    v.status === 'activo'
                      ? 'bg-green-100 text-green-600'
                      : v.status === 'contactado'
                        ? 'bg-blue-100 text-blue-600'
                        : v.status === 'inactivo'
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {v.status}
                </span>
              </div>

              <div className="space-y-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Mail size={16} /> {v.email}
                </div>
                {v.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} /> {v.phone}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> Registrado: {new Date(v.created_at).toLocaleDateString()}
                </div>
              </div>

              {v.interests && (
                <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs text-gray-600 italic">
                  &quot;{v.interests}&quot;
                </div>
              )}
            </motion.div>
          ))}
      </div>

      <AnimatePresence>
        {showModal && selectedVolunteer && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-secondary mb-6">Cambiar Estado</h2>
              <div className="grid grid-cols-2 gap-3">
                {['pendiente', 'contactado', 'activo', 'inactivo'].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selectedVolunteer.id, status)}
                    className={`py-3 rounded-xl font-bold capitalize transition-all ${
                      selectedVolunteer.status === status
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-6 py-3 border border-gray-100 rounded-xl text-gray-400 font-bold"
              >
                Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
