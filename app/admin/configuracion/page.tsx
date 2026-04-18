'use client';

import { Loader2, Save, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ConfigPage() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (key: string, value: any) => {
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
        alert('Configuración guardada correctamente');
      }
    } catch (err) {
      alert('Error al guardar configuración');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (key: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });
      const data = await res.json();
      if (data.url) {
        handleChange(key, data.url);
      }
    } catch (err) {
      alert('Error al subir imagen');
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-primary">Configuración</h1>
          <p className="text-gray-500">Ajustes generales del sitio y SEO</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="btn-primary flex items-center gap-2"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-6 py-3 font-medium transition-all border-b-2 ${activeTab === 'general' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-6 py-3 font-medium transition-all border-b-2 ${activeTab === 'seo' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
        >
          SEO
        </button>
        <button
          onClick={() => setActiveTab('redes')}
          className={`px-6 py-3 font-medium transition-all border-b-2 ${activeTab === 'redes' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
        >
          Redes Sociales
        </button>
        <button
          onClick={() => setActiveTab('nosotros')}
          className={`px-6 py-3 font-medium transition-all border-b-2 ${activeTab === 'nosotros' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
        >
          Nosotros
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6"
      >
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-secondary">Logo de la Fundación</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                  {settings.site_logo ? (
                    <img
                      src={settings.site_logo}
                      alt="Logo"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <Upload className="text-gray-300" />
                  )}
                </div>
                <input
                  type="file"
                  onChange={(e) =>
                    e.target.files?.[0] && handleFileUpload('site_logo', e.target.files[0])
                  }
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-secondary">
                Nombre de la Fundación
              </label>
              <input
                type="text"
                value={settings.site_title || ''}
                onChange={(e) => handleChange('site_title', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-secondary">Email de Contacto</label>
              <input
                type="email"
                value={settings.contact_email || ''}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-secondary">Teléfono de Contacto</label>
              <input
                type="text"
                value={settings.contact_phone || ''}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary"
              />
            </div>
          </div>
        )}

        {activeTab === 'nosotros' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary">Nuestra Historia</label>
              <textarea
                value={settings.history_text || ''}
                onChange={(e) => handleChange('history_text', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary h-32"
                placeholder="Cuenta cómo nació la fundación..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-secondary">Misión</label>
                <textarea
                  value={settings.mission_text || ''}
                  onChange={(e) => handleChange('mission_text', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary h-32"
                  placeholder="El propósito de la fundación..."
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-secondary">Visión</label>
                <textarea
                  value={settings.vision_text || ''}
                  onChange={(e) => handleChange('vision_text', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary h-32"
                  placeholder="A dónde queremos llegar..."
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary">
                Descripción Global (SEO)
              </label>
              <textarea
                value={settings.global_description || ''}
                onChange={(e) => handleChange('global_description', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary h-32"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary">
                Keywords (separadas por coma)
              </label>
              <input
                type="text"
                value={settings.global_keywords || ''}
                onChange={(e) => handleChange('global_keywords', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary"
              />
            </div>
          </div>
        )}

        {activeTab === 'redes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary">Facebook URL</label>
              <input
                type="text"
                value={settings.social_facebook || ''}
                onChange={(e) => handleChange('social_facebook', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary">Instagram URL</label>
              <input
                type="text"
                value={settings.social_instagram || ''}
                onChange={(e) => handleChange('social_instagram', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-secondary">WhatsApp Admin</label>
              <input
                type="text"
                value={settings.whatsapp_number || ''}
                onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary"
                placeholder="Ej: 573001234567"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
