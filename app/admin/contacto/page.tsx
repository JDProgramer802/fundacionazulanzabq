'use client';

import { useState, useEffect } from 'react';
import { Mail, User, MessageSquare, Loader2, CheckCircle2, Eye, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminContactoPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch('/api/contact');
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    // Basic implementation - we could have a PUT /api/contact/[id] route too
    setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m));
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" size={48} /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary font-primary">Bandeja de Entrada</h1>
        <p className="text-gray-500">Mensajes recibidos desde el formulario de contacto</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List */}
        <div className="lg:col-span-1 space-y-4">
          {messages.map((m) => (
            <div 
              key={m.id}
              onClick={() => {
                setSelectedMessage(m);
                markAsRead(m.id);
              }}
              className={`p-6 rounded-[2rem] border transition-all cursor-pointer ${
                selectedMessage?.id === m.id 
                  ? 'bg-primary/5 border-primary' 
                  : 'bg-white border-gray-100 hover:border-primary/30'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`w-3 h-3 rounded-full ${m.is_read ? 'bg-transparent' : 'bg-primary'}`}></span>
                <span className="text-[10px] uppercase font-bold text-gray-400">{formatDate(m.created_at)}</span>
              </div>
              <h3 className="font-bold text-secondary line-clamp-1">{m.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">{m.message}</p>
            </div>
          ))}
          {messages.length === 0 && (
            <p className="text-center text-gray-500 italic py-12">No hay mensajes aún.</p>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
              <div className="flex justify-between items-start mb-8 pb-8 border-b border-gray-50">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary">
                    <User size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-secondary">{selectedMessage.name}</h2>
                    <p className="text-primary font-medium">{selectedMessage.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{formatDate(selectedMessage.created_at)}</p>
                  <p className="text-xs text-gray-400 mt-1">ID: {selectedMessage.id.substring(0, 8)}</p>
                </div>
              </div>

              <div className="flex-1">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Mensaje</h4>
                 <div className="bg-gray-50 p-8 rounded-3xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                 </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-50 flex justify-end gap-4">
                 <a 
                   href={`mailto:${selectedMessage.email}`}
                   className="btn-primary flex items-center gap-2"
                 >
                   <Mail size={18} /> Responder por Email
                 </a>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] border border-dashed border-gray-200 h-full min-h-[500px] flex flex-col items-center justify-center text-gray-400">
               <MessageSquare size={48} className="mb-4 opacity-20" />
               <p>Selecciona un mensaje para ver el detalle</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
