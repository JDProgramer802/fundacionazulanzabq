'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, FileText, History, Target, Eye } from 'lucide-react';

export default function AdminContenidoPage() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        alert('Contenido actualizado');
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
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-primary">Editor de Contenido</h1>
          <p className="text-gray-500">Gestiona los textos principales de las páginas</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Guardar Cambios
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
            <FileText className="text-primary" /> Inicio - Hero Section
          </h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Título Principal (Hero)</label>
              <input
                type="text"
                value={settings.home_hero_title || ''}
                onChange={(e) => handleChange('home_hero_title', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Subtítulo (Hero)</label>
              <textarea
                value={settings.home_hero_subtitle || ''}
                onChange={(e) => handleChange('home_hero_subtitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary h-24"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
              <Target className="text-primary" /> Misión
            </h3>
            <textarea
              value={settings.mission_text || ''}
              onChange={(e) => handleChange('mission_text', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary h-40"
            />
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
              <Eye className="text-primary" /> Visión
            </h3>
            <textarea
              value={settings.vision_text || ''}
              onChange={(e) => handleChange('vision_text', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary h-40"
            />
          </div>
        </div>

        {/* History */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
            <History className="text-primary" /> Nuestra Historia
          </h3>
          <textarea
            value={settings.history_text || ''}
            onChange={(e) => handleChange('history_text', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary h-64"
          />
        </div>
      </form>
    </div>
  );
}
