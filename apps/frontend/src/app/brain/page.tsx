'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api, BrandBrain } from '@/lib/api';

function BrainConfigContent() {
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get('slug') || '';

  const [brains, setBrains] = useState<BrandBrain[]>([]);
  const [selected, setSelected] = useState<BrandBrain | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getBrains().then((data) => {
      setBrains(data);
      if (initialSlug) {
        const brain = data.find((b) => b.slug === initialSlug);
        if (brain) setSelected(brain);
      }
    }).catch(console.error);
  // The effect runs once on mount to load brains and set the initial selection.
  // Re-running when initialSlug changes is not needed because it comes from
  // static search params and does not change after mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (!selected) return;
    setLoading(true);
    setSaved(false);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/brand-brain/${selected.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selected),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configuración de Cerebro de Marca</h1>
        <p className="text-gray-500 text-sm mt-1">
          Personaliza el contexto y tono de cada marca para generar contenido preciso.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Selecciona marca</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {brains.map((b) => (
            <button
              key={b.slug}
              onClick={() => setSelected(b)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                selected?.slug === b.slug
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selected.name}
                onChange={(e) => setSelected({ ...selected, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tono</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selected.tone}
                onChange={(e) => setSelected({ ...selected, tone: e.target.value })}
              >
                <option value="cercano">Cercano</option>
                <option value="profesional">Profesional</option>
                <option value="inspirador">Inspirador</option>
                <option value="técnico-cercano">Técnico-Cercano</option>
                <option value="educativo">Educativo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del negocio</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
              value={selected.description}
              onChange={(e) => setSelected({ ...selected, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => void handleSave()}
              disabled={loading}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Guardando...' : saved ? '✅ Guardado' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BrainPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-400">Cargando...</div>}>
      <BrainConfigContent />
    </Suspense>
  );
}
