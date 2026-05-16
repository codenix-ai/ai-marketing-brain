'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api, BrandBrain, MarketingTask, GenerateResult } from '@/lib/api';

const CATEGORY_LABELS: Record<string, string> = {
  social: '📱 Social Media',
  email: '📧 Email',
  ads: '🎯 Ads',
  seo: '🔍 SEO',
  strategy: '📅 Estrategia',
};

function GeneratePageContent() {
  const searchParams = useSearchParams();
  const initialBrand = searchParams.get('brand') || '';
  const initialCategory = searchParams.get('category') || '';

  const [brains, setBrains] = useState<BrandBrain[]>([]);
  const [tasks, setTasks] = useState<MarketingTask[]>([]);
  const [selectedBrain, setSelectedBrain] = useState(initialBrand);
  const [selectedTask, setSelectedTask] = useState<MarketingTask | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    api.getBrains().then(setBrains).catch(console.error);
  }, []);

  useEffect(() => {
    api.getTasks(selectedCategory || undefined).then(setTasks).catch(console.error);
  }, [selectedCategory]);

  const handleTaskSelect = useCallback((task: MarketingTask) => {
    setSelectedTask(task);
    setInputs({});
    setResult(null);
    setError(null);
  }, []);

  const handleGenerate = async () => {
    if (!selectedBrain || !selectedTask) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await api.generate({
        brandSlug: selectedBrain,
        taskSlug: selectedTask.slug,
        inputs,
      });
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al generar contenido');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = [...new Set(tasks.map((t) => t.category))];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left panel: selector */}
      <div className="lg:col-span-1 space-y-6">
        {/* Brand selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🧠 Cerebro de Marca
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedBrain}
            onChange={(e) => setSelectedBrain(e.target.value)}
          >
            <option value="">Selecciona una marca...</option>
            {brains.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Categoría
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                !selectedCategory
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
              }`}
            >
              Todas
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
                }`}
              >
                {CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Task list */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tarea de Marketing
          </label>
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {tasks.length === 0 && (
              <p className="text-sm text-gray-400 py-4 text-center">Cargando tareas...</p>
            )}
            {tasks.map((task) => (
              <button
                key={task.slug}
                onClick={() => handleTaskSelect(task)}
                className={`w-full text-left rounded-lg border p-3 transition-all ${
                  selectedTask?.slug === task.slug
                    ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg mt-0.5">{task.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{task.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{task.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel: form + output */}
      <div className="lg:col-span-2 space-y-6">
        {!selectedTask && (
          <div className="flex items-center justify-center h-64 rounded-xl border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-3">✨</div>
              <p className="text-sm">Selecciona una tarea para empezar</p>
            </div>
          </div>
        )}

        {selectedTask && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{selectedTask.icon}</span>
              <div>
                <h2 className="font-semibold text-gray-900">{selectedTask.label}</h2>
                <p className="text-xs text-gray-500">{selectedTask.description}</p>
              </div>
            </div>

            {/* Input fields */}
            <div className="space-y-4 mb-6">
              {selectedTask.inputFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      rows={3}
                      placeholder={field.placeholder}
                      value={inputs[field.name] || ''}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, [field.name]: e.target.value }))
                      }
                    />
                  ) : field.type === 'select' && field.options ? (
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={inputs[field.name] || ''}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, [field.name]: e.target.value }))
                      }
                    >
                      <option value="">Seleccionar...</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={field.placeholder}
                      value={inputs[field.name] || ''}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, [field.name]: e.target.value }))
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !selectedBrain}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Generando...
                </>
              ) : (
                '✨ Generar con Claude'
              )}
            </button>

            {!selectedBrain && (
              <p className="text-xs text-amber-600 mt-2 text-center">
                ⚠️ Selecciona un cerebro de marca primero
              </p>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            ❌ {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-green-500 font-semibold text-sm">✅ Contenido generado</span>
                <span className="text-xs text-gray-400">
                  {result.tokensUsed.toLocaleString()} tokens · {result.estimatedCost}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md transition-colors"
              >
                {copied ? '✅ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <pre className="p-6 text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed max-h-[500px] overflow-y-auto">
              {result.content}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-400">Cargando...</div>}>
      <GeneratePageContent />
    </Suspense>
  );
}
