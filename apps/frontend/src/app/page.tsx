import Link from "next/link";

const BRANDS = [
  { slug: "emprendyup", name: "EmprendyUp", emoji: "🚀", color: "bg-indigo-50 border-indigo-200" },
  { slug: "inmuebli", name: "Inmuebli", emoji: "🏠", color: "bg-emerald-50 border-emerald-200" },
  { slug: "codenixai", name: "CodenixAI", emoji: "⚙️", color: "bg-violet-50 border-violet-200" },
  { slug: "aidevacademy", name: "AIDevAcademy", emoji: "🎓", color: "bg-amber-50 border-amber-200" },
];

const CATEGORIES = [
  { slug: "social", label: "Social Media", icon: "📱", count: 4 },
  { slug: "email", label: "Email Marketing", icon: "📧", count: 3 },
  { slug: "ads", label: "Publicidad", icon: "🎯", count: 2 },
  { slug: "seo", label: "SEO / Blog", icon: "🔍", count: 1 },
  { slug: "strategy", label: "Estrategia", icon: "📅", count: 3 },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Motor de Contenido de Marketing
        </h1>
        <p className="text-gray-500 text-lg">
          Genera contenido de alta calidad con IA en segundos. Selecciona tu marca y empieza.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Cerebros de Marca
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/generate?brand=${brand.slug}`}
              className={`rounded-xl border-2 p-5 ${brand.color} hover:shadow-md transition-shadow block`}
            >
              <div className="text-3xl mb-2">{brand.emoji}</div>
              <div className="font-semibold text-gray-800">{brand.name}</div>
              <div className="text-xs text-gray-500 mt-1">Ver tareas →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Categorías de Contenido
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/generate?category=${cat.slug}`}
              className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:border-indigo-400 hover:shadow-sm transition-all"
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="text-sm font-medium text-gray-700">{cat.label}</div>
              <div className="text-xs text-gray-400 mt-1">{cat.count} tareas</div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Acciones Rápidas
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/generate"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            ✨ Generar Contenido
          </Link>
          <Link
            href="/history"
            className="bg-white text-gray-700 border border-gray-300 px-5 py-2.5 rounded-lg font-medium hover:border-indigo-400 transition-colors"
          >
            📚 Ver Historial
          </Link>
        </div>
      </section>
    </div>
  );
}
