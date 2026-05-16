import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BrandBrain } from '@prisma/client';
import { CreateBrandBrainDto, UpdateBrandBrainDto } from './dto';

@Injectable()
export class BrandBrainService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.brandBrain.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const brain = await this.prisma.brandBrain.findUnique({
      where: { slug },
    });
    if (!brain)
      throw new NotFoundException(`Brand brain '${slug}' no encontrado`);
    return brain;
  }

  async create(dto: CreateBrandBrainDto) {
    return this.prisma.brandBrain.create({ data: dto });
  }

  async update(slug: string, dto: UpdateBrandBrainDto) {
    await this.findBySlug(slug);
    return this.prisma.brandBrain.update({
      where: { slug },
      data: dto,
    });
  }

  buildSystemPrompt(brain: BrandBrain): string {
    return `Eres el equipo de marketing de ${brain.name}.

## Sobre el negocio
${brain.description}

## Propuesta de valor única
${brain.uniqueValue}

## Producto/Servicio principal
${brain.mainProduct}

## Audiencia objetivo
${brain.targetAudience}

## Voz y tono de marca
${brain.brandVoice}

## Configuración regional
- País principal: ${brain.country}
- Idioma: ${brain.language}
- Contexto cultural: Mercado latinoamericano, especialmente Colombia.

## Reglas estrictas
- NUNCA uses estas palabras: ${brain.forbiddenWords.join(', ')}
- NO menciones a estos competidores: ${brain.competitors.join(', ')}
- Mantén SIEMPRE el tono definido arriba
- Todo el contenido debe ser en ${brain.language}

## Ejemplos de contenido que ha funcionado bien
${JSON.stringify(brain.contentExamples, null, 2)}

Responde SOLO con el contenido solicitado. Sin explicaciones, sin preámbulos.`;
  }
}
