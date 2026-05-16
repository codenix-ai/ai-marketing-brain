const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface BrandBrain {
  id: string;
  slug: string;
  name: string;
  description: string;
  tone: string;
  language: string;
  country: string;
}

export interface InputField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface MarketingTask {
  id: string;
  slug: string;
  category: string;
  label: string;
  description: string;
  icon: string;
  inputFields: InputField[];
  maxTokens: number;
}

export interface GeneratedContent {
  id: string;
  taskSlug: string;
  taskLabel: string;
  content: string;
  tokensUsed: number;
  isFavorite: boolean;
  createdAt: string;
  brandBrain?: { slug: string; name: string };
  userInputs: Record<string, string>;
}

export interface GenerateResult {
  id: string;
  content: string;
  tokensUsed: number;
  estimatedCost: string;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getBrains: () => apiFetch<BrandBrain[]>('/marketing/brains'),
  getTasks: (category?: string) =>
    apiFetch<MarketingTask[]>(`/marketing/tasks${category ? `?category=${category}` : ''}`),
  generate: (body: { brandSlug: string; taskSlug: string; inputs: Record<string, string> }) =>
    apiFetch<GenerateResult>('/marketing/generate', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  getHistory: (brandSlug?: string, taskSlug?: string, limit = 20) => {
    const params = new URLSearchParams();
    if (brandSlug) params.set('brandSlug', brandSlug);
    if (taskSlug) params.set('taskSlug', taskSlug);
    params.set('limit', String(limit));
    return apiFetch<GeneratedContent[]>(`/marketing/history?${params.toString()}`);
  },
  toggleFavorite: (id: string) =>
    apiFetch<GeneratedContent>(`/marketing/history/${id}/favorite`, { method: 'PATCH' }),
};
