'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminCitasPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const res = await fetch('/api/appointments');
    const data = await res.json();
    setAppointments(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setAppointments(appointments.map((a) => (a.id === id ? { ...a, status } : a)));
      }
    } catch (err) {
      alert('Error al actualizar estado');
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
      <div>
        <h1 className="text-3xl font-bold text-secondary font-primary">Gestión de Citas</h1>
        <p className="text-gray-500">Administra las solicitudes de asesoría psicológica</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((app) => (
          <div
            key={app.id}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-gray-50 rounded-2xl">
                  <User className="text-secondary" />
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    app.status === 'pendiente'
                      ? 'bg-orange-50 text-orange-600'
                      : app.status === 'confirmada'
                        ? 'bg-blue-50 text-blue-600'
                        : app.status === 'completada'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-red-50 text-red-600'
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-secondary">{app.client_name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Calendar size={14} /> {formatDate(app.datetime)}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Clock size={14} />{' '}
                  {new Date(app.datetime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} className="text-primary" /> {app.client_email}
                </div>
                {app.client_phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} className="text-primary" /> {app.client_phone}
                  </div>
                )}
                {app.reason && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MessageSquare size={14} className="text-primary mt-1 shrink-0" />
                    <p className="italic">{app.reason}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 flex gap-2">
              {app.status === 'pendiente' && (
                <button
                  onClick={() => updateStatus(app.id, 'confirmada')}
                  className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  Confirmar
                </button>
              )}
              {app.status === 'confirmada' && (
                <button
                  onClick={() => updateStatus(app.id, 'completada')}
                  className="flex-1 bg-green-50 text-green-600 py-2 rounded-xl text-xs font-bold hover:bg-green-100 transition-colors"
                >
                  Completar
                </button>
              )}
              {app.status !== 'cancelada' && app.status !== 'completada' && (
                <button
                  onClick={() => updateStatus(app.id, 'cancelada')}
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        ))}
        {appointments.length === 0 && (
          <div className="col-span-full p-20 text-center text-gray-500 italic">
            No hay citas agendadas aún.
          </div>
        )}
      </div>
    </div>
  );
}
