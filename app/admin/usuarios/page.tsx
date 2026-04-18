'use client';

import { useEffect, useState } from 'react';
import { UserPlus, Trash2, Mail, Shield, Calendar, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', role: 'admin' });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Invitando usuario...' });

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: 'Usuario invitado correctamente' });
        setFormData({ email: '', password: '', role: 'admin' });
        setShowInviteModal(false);
        fetchUsers();
      } else {
        setStatus({ type: 'error', message: data.error || 'Error al invitar usuario' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error de conexión' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Gestión de Usuarios</h1>
          <p className="text-gray-500 mt-1">Administra los accesos al panel de control.</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="btn-primary flex items-center gap-2 px-6 py-3"
        >
          <UserPlus size={20} />
          Invitar Usuario
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={user.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <UserIcon size={24} />
                </div>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-secondary font-semibold">
                  <Mail size={16} className="text-gray-400" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Shield size={16} className="text-gray-400" />
                  <span className="capitalize">{user.role}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} className="text-gray-400" />
                  <span>Registrado: {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-secondary">Invitar Nuevo Administrador</h2>
              <button onClick={() => setShowInviteModal(false)} className="text-gray-400 hover:text-secondary">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email del Usuario</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="admin@fundacionazulanza.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña Temporal</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Rol de Usuario</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="admin">Administrador Full</option>
                  <option value="editor">Editor (Solo Contenido)</option>
                </select>
              </div>

              {status.message && (
                <div className={`p-4 rounded-xl text-sm ${
                  status.type === 'error' ? 'bg-red-50 text-red-600' : 
                  status.type === 'success' ? 'bg-green-50 text-green-600' : 
                  'bg-blue-50 text-blue-600'
                }`}>
                  {status.message}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="flex-1 btn-primary px-6 py-3 disabled:opacity-50"
                >
                  Confirmar Invitación
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
