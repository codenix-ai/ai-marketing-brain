'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api, GeneratedContent } from '@/lib/api';

function HistoryContent() {
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get('brand') || '';

  const [items, setItems] = useState<GeneratedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandFilter, setBrandFilter] = useState(initialBrand);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await api.getHistory(brandFilter || undefined, undefined, 50);
        setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [brandFilter]);

  const handleFavorite = async (id: string) => {
    await api.toggleFavorite(id);
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    );
  };

  const handleCopy = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const brands = [...new Set(items.map((i) => i.brandBrain?.slug).filter(Boolean))];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historial de Contenido</h1>
          <p className="text-gray-500 text-sm mt-1">Todo el contenido generado</p>
        </div>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          <option value="">Todas las marcas</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-3xl mb-3">⏳</div>
          <p className="text-sm">Cargando historial...</p>
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-sm">No hay contenido generado todavía</p>
        </div>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{item.taskLabel}</div>
                  <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {item.brandBrain?.name || item.brandBrain?.slug || '—'}
                    </span>
                    <span>{new Date(item.createdAt).toLocaleDateString('es-CO')}</span>
                    <span>{item.tokensUsed.toLocaleString()} tokens</span>
                  </div>
                </div>
                {item.isFavorite && <span className="text-amber-500">⭐</span>}
              </div>
              <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                {!item.isFavorite && (
                  <button
                    onClick={() => void handleFavorite(item.id)}
                    className="text-xs text-gray-400 hover:text-amber-500 transition-colors"
                    title="Marcar favorito"
                  >
                    ☆
                  </button>
                )}
                <button
                  onClick={() => void handleCopy(item.id, item.content)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded transition-colors"
                >
                  {copied === item.id ? '✅' : '📋'}
                </button>
                <button
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                  className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded transition-colors"
                >
                  {expanded === item.id ? 'Cerrar' : 'Ver'}
                </button>
              </div>
            </div>

            {expanded === item.id && (
              <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed max-h-96 overflow-y-auto">
                  {item.content}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-400">Cargando...</div>}>
      <HistoryContent />
    </Suspense>
  );
}
