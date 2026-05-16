export const MARKETING_TASKS = [
  // ── SOCIAL MEDIA ──────────────────────────────────────────
  {
    slug: 'instagram_5posts',
    category: 'social',
    label: '5 Posts para Instagram',
    description: 'Genera 5 posts listos para publicar con copy + hashtags',
    icon: '📸',
    systemPrompt: '',
    userPrompt: `Crea 5 posts de Instagram para {brandName} sobre el tema: "{topic}".

Para cada post incluye:
1. Copy principal (máx 150 palabras, tono conversacional)
2. CTA claro: {cta}
3. 15 hashtags relevantes (mix popular + nicho)
4. Emoji strategy

Formato de salida:
---
POST 1
[Copy]
[CTA]
[Hashtags]
---`,
    maxTokens: 2500,
    temperature: 0.8,
    inputFields: [
      { name: 'topic', label: 'Tema o campaña', type: 'text', required: true, placeholder: 'Lanzamiento de nueva función...' },
      { name: 'cta', label: 'Call to Action', type: 'text', required: true, placeholder: 'Regístrate gratis en emprendy.ai' },
    ],
    sortOrder: 1,
  },
  {
    slug: 'instagram_carousel',
    category: 'social',
    label: 'Carrusel de Instagram (7 slides)',
    description: 'Estructura completa de carrusel educativo/inspiracional',
    icon: '🎠',
    systemPrompt: '',
    userPrompt: `Crea un carrusel de Instagram de 7 slides para {brandName} sobre: "{topic}".

Slide 1 - GANCHO (pregunta polémica o stat sorprendente)
Slide 2 - Problema que tiene {audience}
Slides 3-6 - Solución paso a paso (1 insight por slide)
Slide 7 - CTA: {cta}

Para cada slide:
- Título (máx 6 palabras)
- Texto del slide (máx 40 palabras)
- Nota para el diseñador (qué imagen/ícono usar)`,
    maxTokens: 2000,
    temperature: 0.75,
    inputFields: [
      { name: 'topic', label: 'Tema del carrusel', type: 'text', required: true },
      { name: 'cta', label: 'CTA final', type: 'text', required: true },
    ],
    sortOrder: 2,
  },
  {
    slug: 'linkedin_post',
    category: 'social',
    label: 'Post LinkedIn (Founder Story)',
    description: 'Post estilo founder storytelling para LinkedIn',
    icon: '💼',
    systemPrompt: '',
    userPrompt: `Escribe un post de LinkedIn para el fundador de {brandName} sobre: "{topic}".

Estructura obligatoria:
- Hook: Primera línea que detiene el scroll (no empieces con "Hoy quiero...")
- Historia: Anécdota real o hipotética de 3-4 párrafos
- Insight: La lección aprendida
- CTA suave: {cta}

Tono: Humano, vulnerable pero experto. Nada corporativo.
Longitud: 200-280 palabras.`,
    maxTokens: 1500,
    temperature: 0.85,
    inputFields: [
      { name: 'topic', label: 'Tema o historia', type: 'text', required: true },
      { name: 'cta', label: 'CTA', type: 'text', required: true },
    ],
    sortOrder: 3,
  },
  {
    slug: 'tiktok_scripts_3',
    category: 'social',
    label: '3 Scripts para TikTok/Reels',
    description: 'Guiones de 30-60 segundos con estructura de retención',
    icon: '🎬',
    systemPrompt: '',
    userPrompt: `Crea 3 scripts de TikTok/Reels para {brandName} sobre: "{topic}".

Para cada script:
- Duración objetivo: {duration} segundos
- Segundos 0-3: GANCHO (pregunta, afirmación polémica o demostración visual)
- Segundos 4-45: Valor / desarrollo
- Segundos 46-60: CTA + {cta}

Formato de salida por script:
GANCHO: [texto que dice en cámara]
DESARROLLO: [texto con notas de b-roll entre corchetes]
CTA: [texto final]
CAPTION: [texto para el pie del video + hashtags]`,
    maxTokens: 2500,
    temperature: 0.8,
    inputFields: [
      { name: 'topic', label: 'Tema del video', type: 'text', required: true },
      { name: 'duration', label: 'Duración (segundos)', type: 'select', required: true, options: ['30', '45', '60', '90'] },
      { name: 'cta', label: 'CTA', type: 'text', required: true },
    ],
    sortOrder: 4,
  },

  // ── EMAIL MARKETING ────────────────────────────────────────
  {
    slug: 'email_sequence_7',
    category: 'email',
    label: 'Secuencia de 7 Emails (Onboarding)',
    description: 'Secuencia completa de bienvenida/onboarding para nuevos usuarios',
    icon: '📧',
    systemPrompt: '',
    userPrompt: `Crea una secuencia de 7 emails de onboarding para {brandName}.

Objetivo de la secuencia: {goal}
Producto/feature clave a activar: {keyFeature}

Email 1 (Día 0): Bienvenida + expectativa
Email 2 (Día 1): Quick win - primer resultado en 5 minutos
Email 3 (Día 3): Superar la primera objeción común de {audience}
Email 4 (Día 5): Caso de éxito / prueba social
Email 5 (Día 7): Feature avanzada que pocos usan
Email 6 (Día 10): Reactivación si no han hecho X
Email 7 (Día 14): Upgrade / siguiente paso

Para cada email:
Asunto: [3 opciones A/B/C]
Preview text: [máx 90 caracteres]
Cuerpo: [200-300 palabras]
CTA principal: [botón]`,
    maxTokens: 4000,
    temperature: 0.7,
    inputFields: [
      { name: 'goal', label: 'Objetivo de la secuencia', type: 'text', required: true, placeholder: 'Que el usuario publique su primera tienda' },
      { name: 'keyFeature', label: 'Feature clave a activar', type: 'text', required: true },
    ],
    sortOrder: 10,
  },
  {
    slug: 'email_reactivation',
    category: 'email',
    label: 'Email de Reactivación (Win-back)',
    description: 'Email para usuarios inactivos +30 días',
    icon: '🔄',
    systemPrompt: '',
    userPrompt: `Escribe un email de reactivación para usuarios de {brandName} que llevan {inactiveDays} días sin entrar.

El tono debe ser: honesto, sin culpa, con valor real.

Incluye:
- Asunto: (4 opciones, una con su nombre personalizado {firstName})
- Preview text
- Apertura: reconoce el tiempo sin hablar, sin drama
- Novedad: qué ha cambiado desde que se fue
- Incentivo: {incentive}
- CTA claro
- PD con urgencia real (no falsa)`,
    maxTokens: 1500,
    temperature: 0.72,
    inputFields: [
      { name: 'inactiveDays', label: 'Días de inactividad', type: 'select', required: true, options: ['30', '60', '90', '180'] },
      { name: 'incentive', label: 'Incentivo a ofrecer', type: 'text', required: true, placeholder: '1 mes gratis, descuento 30%...' },
    ],
    sortOrder: 11,
  },
  {
    slug: 'email_newsletter',
    category: 'email',
    label: 'Newsletter Semanal',
    description: 'Newsletter completo listo para enviar en Brevo',
    icon: '📰',
    systemPrompt: '',
    userPrompt: `Escribe el newsletter semanal de {brandName} para la semana del {weekDate}.

Tema principal: {mainTopic}
Noticias del sector a mencionar: {news}

Estructura:
1. INTRO (50 palabras, personal y cercana)
2. ARTÍCULO PRINCIPAL (300 palabras sobre {mainTopic})
3. RECURSOS DE LA SEMANA (3 links/herramientas con descripción de 1 línea)
4. TIP RÁPIDO (1 acción que pueden hacer hoy)
5. CTA FINAL: {cta}

Asunto del email: [3 opciones]
Preview text: [3 opciones]`,
    maxTokens: 2500,
    temperature: 0.75,
    inputFields: [
      { name: 'weekDate', label: 'Semana', type: 'text', required: true, placeholder: '19-25 Mayo 2026' },
      { name: 'mainTopic', label: 'Tema principal', type: 'text', required: true },
      { name: 'news', label: 'Noticias del sector (opcional)', type: 'textarea', required: false },
      { name: 'cta', label: 'CTA principal', type: 'text', required: true },
    ],
    sortOrder: 12,
  },

  // ── META ADS ───────────────────────────────────────────────
  {
    slug: 'meta_ads_3variants',
    category: 'ads',
    label: 'Meta Ads (3 variantes A/B/C)',
    description: '3 variantes completas para testear en Facebook/Instagram Ads',
    icon: '🎯',
    systemPrompt: '',
    userPrompt: `Crea 3 variantes de anuncio para Meta Ads de {brandName}.

Objetivo de la campaña: {objective}
Segmento: {segment}
Oferta/Gancho: {offer}
Landing page destino: {landingUrl}

Para cada variante (A, B, C con diferentes ángulos de persuasión):
- Ángulo: [pain-based / gain-based / fear-based]
- Texto principal (Primary text): máx 125 caracteres
- Título (Headline): máx 40 caracteres
- Descripción: máx 25 caracteres
- CTA button: [elegir de: Más información / Registrarte / Comprar / Obtener oferta]
- Hook visual sugerido: [descripción de la imagen/video ideal]`,
    maxTokens: 2000,
    temperature: 0.8,
    inputFields: [
      { name: 'objective', label: 'Objetivo', type: 'select', required: true, options: ['Leads', 'Tráfico web', 'Conversiones', 'Awareness'] },
      { name: 'segment', label: 'Segmento objetivo', type: 'text', required: true, placeholder: 'Emprendedores Colombia 28-45 años' },
      { name: 'offer', label: 'Oferta o gancho', type: 'text', required: true, placeholder: 'Prueba gratis 14 días sin tarjeta' },
      { name: 'landingUrl', label: 'URL destino', type: 'text', required: false },
    ],
    sortOrder: 20,
  },
  {
    slug: 'google_ads_search',
    category: 'ads',
    label: 'Google Ads - Anuncios de Búsqueda',
    description: 'RSA completo con 15 títulos y 4 descripciones',
    icon: '🔍',
    systemPrompt: '',
    userPrompt: `Crea un anuncio de búsqueda responsivo (RSA) para Google Ads de {brandName}.

Keyword principal: {keyword}
Intención del buscador: {intent}
Diferenciador clave: {differentiator}

Genera:
- 15 TÍTULOS (máx 30 caracteres cada uno, variados: incluye keyword, beneficios, CTAs, urgencia)
- 4 DESCRIPCIONES (máx 90 caracteres cada una)
- 2 SITELINKS sugeridos con descripción
- EXTENSIÓN DE LLAMADA sugerida

Marca con [P] los que incluyen la keyword principal.`,
    maxTokens: 2000,
    temperature: 0.72,
    inputFields: [
      { name: 'keyword', label: 'Keyword principal', type: 'text', required: true },
      { name: 'intent', label: 'Intención del buscador', type: 'text', required: true, placeholder: 'Busca software para gestionar su negocio' },
      { name: 'differentiator', label: 'Diferenciador clave', type: 'text', required: true },
    ],
    sortOrder: 21,
  },

  // ── SEO / BLOG ─────────────────────────────────────────────
  {
    slug: 'blog_seo_full',
    category: 'seo',
    label: 'Blog Post SEO Completo (1200 palabras)',
    description: 'Artículo optimizado con estructura SEO, meta tags y CTA',
    icon: '📝',
    systemPrompt: '',
    userPrompt: `Escribe un artículo de blog SEO para {brandName}.

Keyword principal: {keyword}
Keywords secundarias: {secondaryKeywords}
Intención de búsqueda: {searchIntent}

Estructura obligatoria:
- Title tag SEO: (máx 60 caracteres, con keyword)
- Meta description: (máx 155 caracteres)
- H1: (diferente al title tag pero con keyword)
- INTRO (150 palabras, engancha al lector, incluye keyword en primer párrafo)
- H2 + contenido (repite estructura 4-5 veces)
- FAQ section (3-4 preguntas de búsqueda de voz)
- CONCLUSIÓN con CTA: {cta}
- Internal linking suggestions: [3 artículos relacionados a crear]

Total aprox: 1200 palabras. Texto fluido, sin keyword stuffing.`,
    maxTokens: 4000,
    temperature: 0.7,
    inputFields: [
      { name: 'keyword', label: 'Keyword principal', type: 'text', required: true },
      { name: 'secondaryKeywords', label: 'Keywords secundarias', type: 'text', required: false, placeholder: 'kw1, kw2, kw3' },
      { name: 'searchIntent', label: 'Intención', type: 'select', required: true, options: ['Informacional', 'Transaccional', 'Navegacional', 'Comparativa'] },
      { name: 'cta', label: 'CTA al final', type: 'text', required: true },
    ],
    sortOrder: 30,
  },

  // ── ESTRATEGIA ─────────────────────────────────────────────
  {
    slug: 'content_plan_monthly',
    category: 'strategy',
    label: 'Plan de Contenido Mensual',
    description: 'Plan completo de contenido para 4 semanas con temas, formatos y canales',
    icon: '📅',
    systemPrompt: '',
    userPrompt: `Crea el plan de contenido del mes de {month} para {brandName}.

Objetivo del mes: {monthlyGoal}
Campaña o lanzamiento: {campaign}
Canales activos: {channels}

Entrega:
- TEMA CENTRAL DEL MES (narrativa que hile todo)
- Por cada semana (4 semanas):
  - Tema semanal
  - 3 posts Instagram (temas específicos)
  - 2 posts LinkedIn
  - 2 TikToks/Reels (guión de 10 palabras)
  - 1 email a lista
  - 1 idea de contenido viral/experimental
- KPIs a trackear cada semana
- Fechas importantes del mes a aprovechar`,
    maxTokens: 3500,
    temperature: 0.75,
    inputFields: [
      { name: 'month', label: 'Mes', type: 'text', required: true, placeholder: 'Junio 2026' },
      { name: 'monthlyGoal', label: 'Objetivo del mes', type: 'text', required: true, placeholder: '100 nuevos registros' },
      { name: 'campaign', label: 'Campaña o lanzamiento (si aplica)', type: 'text', required: false },
      { name: 'channels', label: 'Canales activos', type: 'text', required: true, placeholder: 'Instagram, LinkedIn, Email, TikTok' },
    ],
    sortOrder: 40,
  },
  {
    slug: 'landing_copy_full',
    category: 'strategy',
    label: 'Copy Completo para Landing Page',
    description: 'Todos los textos de una landing page de conversión',
    icon: '🏠',
    systemPrompt: '',
    userPrompt: `Escribe el copy completo para la landing page de {brandName}.

Oferta principal: {offer}
Audiencia: {audience}
Objeciones principales: {objections}

Secciones:
1. HERO: Headline (max 8 palabras), Subheadline (max 20 palabras), CTA button
2. PROBLEMA: Párrafo que agita el dolor de {audience}
3. SOLUCIÓN: Cómo {brandName} resuelve esto
4. CARACTERÍSTICAS → BENEFICIOS: (5 features con su beneficio real)
5. PRUEBA SOCIAL: 3 testimonios ficticios realistas para el segmento
6. FAQ: 4 objeciones frecuentes contestadas
7. CTA FINAL: Con urgencia y garantía
8. FOOTER: Tagline de marca

Usa la fórmula PAS (Problem-Agitation-Solution) como hilo conductor.`,
    maxTokens: 3000,
    temperature: 0.72,
    inputFields: [
      { name: 'offer', label: 'Oferta principal', type: 'text', required: true },
      { name: 'objections', label: 'Objeciones frecuentes', type: 'textarea', required: false, placeholder: 'Es muy caro, no tengo tiempo...' },
    ],
    sortOrder: 41,
  },
  {
    slug: 'whatsapp_sequence',
    category: 'strategy',
    label: 'Secuencia WhatsApp (5 mensajes)',
    description: 'Flujo de mensajes para WhatsApp Business / nurturing',
    icon: '💬',
    systemPrompt: '',
    userPrompt: `Crea una secuencia de 5 mensajes de WhatsApp para {brandName}.

Objetivo: {goal}
Trigger de entrada: {trigger}

Mensaje 1 (Inmediato): Bienvenida cálida, sin vender
Mensaje 2 (Día 1): Valor gratuito (tip, recurso, insight)
Mensaje 3 (Día 3): Caso de uso / historia de éxito
Mensaje 4 (Día 5): Oferta directa con CTA
Mensaje 5 (Día 8): Seguimiento si no respondió

Cada mensaje:
- Máx 200 caracteres (tono conversacional WhatsApp)
- Sin formatos fancy, como si lo enviara una persona real
- Emojis estratégicos (máx 2 por mensaje)`,
    maxTokens: 1500,
    temperature: 0.8,
    inputFields: [
      { name: 'goal', label: 'Objetivo del flujo', type: 'text', required: true },
      { name: 'trigger', label: '¿Qué activa el flujo?', type: 'text', required: true, placeholder: 'Se registró en el formulario de la landing' },
    ],
    sortOrder: 42,
  },
];
