import { PrismaClient } from '@prisma/client';
import { MARKETING_TASKS } from './seeds/marketing-tasks.seed';

const prisma = new PrismaClient();

const BRAND_BRAINS = [
  {
    slug: 'emprendyup',
    name: 'EmprendyUp',
    description: 'Plataforma SaaS para emprendedores latinoamericanos que quieren digitalizar y escalar su negocio.',
    brandVoice: 'Cercano, empático, motivador. Hablamos de tú a tú, nunca de manera corporativa. Usamos lenguaje simple y directo. Celebramos los pequeños logros.',
    targetAudience: 'Emprendedores colombianos entre 25-45 años con negocios de 1-10 empleados que quieren crecer digitalmente pero no tienen conocimientos técnicos avanzados.',
    mainProduct: 'Plataforma all-in-one para gestionar tienda online, pagos, inventario y marketing desde un solo lugar.',
    uniqueValue: 'La única plataforma hecha para el emprendedor latinoamericano, con soporte en español y métodos de pago locales integrados.',
    tone: 'cercano',
    language: 'es',
    country: 'CO',
    forbiddenWords: ['disruptivo', 'synergy', 'leverage', 'paradigma'],
    competitors: ['Shopify', 'Wix', 'Squarespace'],
    contentExamples: [],
  },
  {
    slug: 'inmuebli',
    name: 'Inmuebli',
    description: 'Proptech colombiana que simplifica la búsqueda, arriendo y compra de inmuebles usando IA.',
    brandVoice: 'Profesional pero accesible. Transmitimos confianza y expertise en el mercado inmobiliario. Desmitificamos los procesos complejos.',
    targetAudience: 'Personas entre 28-50 años buscando arrendar o comprar inmueble en Colombia. También agentes inmobiliarios independientes.',
    mainProduct: 'Portal inmobiliario con IA que empareja compradores/arrendatarios con inmuebles perfectos y automatiza el proceso de documentación.',
    uniqueValue: 'El único portal inmobiliario colombiano con IA conversacional que entiende exactamente lo que buscas y te ahorra semanas de búsqueda.',
    tone: 'profesional',
    language: 'es',
    country: 'CO',
    forbiddenWords: ['cheap', 'barato'],
    competitors: ['Fincaraiz', 'Metrocuadrado', 'Properati'],
    contentExamples: [],
  },
  {
    slug: 'codenixai',
    name: 'CodenixAI',
    description: 'Agencia de desarrollo de software especializada en soluciones con IA para startups y PYMEs latinoamericanas.',
    brandVoice: 'Técnico pero comprensible. Somos los ingenieros de tu startup. Hablamos de resultados reales, no de promesas vacías de IA.',
    targetAudience: 'CTOs, fundadores técnicos y gerentes de producto en startups y PYMEs de LATAM que quieren implementar IA en sus productos.',
    mainProduct: 'Desarrollo de productos digitales con IA: chatbots, automatizaciones, integraciones de LLMs y agentes inteligentes.',
    uniqueValue: 'Construimos tus productos con IA 3x más rápido que una agencia tradicional usando nuestro propio stack de AI-powered development.',
    tone: 'técnico-cercano',
    language: 'es',
    country: 'CO',
    forbiddenWords: ['mágico', 'revolucionario'],
    competitors: ['Globant', 'Magnet', 'Pragma'],
    contentExamples: [],
  },
  {
    slug: 'aidevacademy',
    name: 'AIDevAcademy',
    description: 'Academia online que forma desarrolladores en IA aplicada con proyectos reales y mentoría.',
    brandVoice: 'Inspirador, riguroso y práctico. Somos el profesor que desearías tener. Combinamos profundidad técnica con aplicación inmediata.',
    targetAudience: 'Desarrolladores con 1-5 años de experiencia que quieren especializarse en IA/ML y aumentar su salario o conseguir mejores proyectos.',
    mainProduct: 'Bootcamp de 12 semanas en AI Engineering: LLMs, agentes, RAG, fine-tuning y deployment en producción.',
    uniqueValue: 'El único bootcamp de IA en español donde aprendes construyendo proyectos reales con empresas reales de LATAM.',
    tone: 'inspirador',
    language: 'es',
    country: 'CO',
    forbiddenWords: ['fácil', 'sin esfuerzo', 'en minutos'],
    competitors: ['Platzi', 'Coursera', 'Udemy'],
    contentExamples: [],
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Seed brand brains
  for (const brain of BRAND_BRAINS) {
    await prisma.brandBrain.upsert({
      where: { slug: brain.slug },
      update: brain,
      create: brain,
    });
    console.log(`✅ BrandBrain: ${brain.name}`);
  }

  // Seed marketing tasks
  for (const task of MARKETING_TASKS) {
    await prisma.marketingTask.upsert({
      where: { slug: task.slug },
      update: task,
      create: task,
    });
    console.log(`✅ MarketingTask: ${task.label}`);
  }

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
