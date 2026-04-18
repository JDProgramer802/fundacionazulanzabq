'use client';

import { useState, useEffect } from 'react';
import {
  Heart,
  DollarSign,
  User,
  Mail,
  Eye,
  Loader2,
  CheckCircle2,
  XCircle,
  FileText,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminDonacionesPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const res = await fetch('/api/donations');
    const data = await res.json();
    setDonations(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/donations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setDonations(donations.map((d) => (d.id === id ? { ...d, status } : d)));
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
        <h1 className="text-3xl font-bold text-secondary font-primary">Gestión de Donaciones</h1>
        <p className="text-gray-500">Verifica y gestiona los reportes de donaciones</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-8 py-4 font-bold">Donante</th>
              <th className="px-8 py-4 font-bold">Monto</th>
              <th className="px-8 py-4 font-bold">Fecha</th>
              <th className="px-8 py-4 font-bold">Estado</th>
              <th className="px-8 py-4 font-bold">Comprobante</th>
              <th className="px-8 py-4 font-bold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {donations.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-4">
                  <p className="font-bold text-secondary">{d.donor_name}</p>
                  <p className="text-xs text-gray-400">{d.donor_email}</p>
                </td>
                <td className="px-8 py-4">
                  <span className="font-bold text-green-600">${d.amount.toLocaleString()}</span>
                </td>
                <td className="px-8 py-4 text-sm text-gray-500">{formatDate(d.created_at)}</td>
                <td className="px-8 py-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      d.status === 'pendiente_verificacion'
                        ? 'bg-orange-50 text-orange-600'
                        : d.status === 'verificada'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {d.status === 'pendiente_verificacion' ? 'Pendiente' : d.status}
                  </span>
                </td>
                <td className="px-8 py-4">
                  {d.receipt_image ? (
                    <button
                      onClick={() => setSelectedReceipt(d.receipt_image)}
                      className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                    >
                      <FileText size={16} /> Ver Recibo
                    </button>
                  ) : (
                    <span className="text-gray-300 italic text-sm">Sin imagen</span>
                  )}
                </td>
                <td className="px-8 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {d.status === 'pendiente_verificacion' && (
                      <>
                        <button
                          onClick={() => updateStatus(d.id, 'verificada')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Verificar"
                        >
                          <CheckCircle2 size={20} />
                        </button>
                        <button
                          onClick={() => updateStatus(d.id, 'rechazada')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Rechazar"
                        >
                          <XCircle size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {donations.length === 0 && (
          <div className="p-12 text-center text-gray-500 italic">
            No hay reportes de donación aún.
          </div>
        )}
      </div>

      {/* Lightbox para el comprobante */}
      {selectedReceipt && (
        <div
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-8"
          onClick={() => setSelectedReceipt(null)}
        >
          <div className="max-w-4xl w-full max-h-full relative">
            <img
              src={selectedReceipt}
              alt="Comprobante"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
            <button
              className="absolute top-4 right-4 bg-white rounded-full p-2 text-secondary"
              onClick={() => setSelectedReceipt(null)}
            >
              <XCircle size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
