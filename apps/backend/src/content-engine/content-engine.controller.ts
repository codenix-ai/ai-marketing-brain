import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ContentEngineService } from './content-engine.service';
import { BrandBrainService } from '../brand-brain/brand-brain.service';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateContentDto } from './dto/generate-content.dto';

@Controller('marketing')
export class MarketingController {
  constructor(
    private contentEngine: ContentEngineService,
    private brandBrain: BrandBrainService,
    private prisma: PrismaService,
  ) {}

  // GET /marketing/brains
  @Get('brains')
  getBrains() {
    return this.brandBrain.findAll();
  }

  // GET /marketing/tasks
  @Get('tasks')
  getTasks(@Query('category') category?: string) {
    return this.prisma.marketingTask.findMany({
      where: { isActive: true, ...(category && { category }) },
      orderBy: { sortOrder: 'asc' },
    });
  }

  // POST /marketing/generate
  @Post('generate')
  generate(@Body() dto: GenerateContentDto) {
    return this.contentEngine.generate(dto);
  }

  // POST /marketing/generate/batch
  @Post('generate/batch')
  generateBatch(@Body() dto: { jobs: GenerateContentDto[] }) {
    return this.contentEngine.generateBatch(dto.jobs);
  }

  // GET /marketing/history
  @Get('history')
  getHistory(
    @Query('brandSlug') brandSlug?: string,
    @Query('taskSlug') taskSlug?: string,
    @Query('limit') limit = '20',
  ) {
    return this.prisma.generatedContent.findMany({
      where: {
        ...(brandSlug && { brandBrain: { slug: brandSlug } }),
        ...(taskSlug && { taskSlug }),
      },
      include: { brandBrain: { select: { slug: true, name: true } } },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit, 10),
    });
  }

  // PATCH /marketing/history/:id/favorite
  @Patch('history/:id/favorite')
  toggleFavorite(@Param('id') id: string) {
    return this.prisma.generatedContent.update({
      where: { id },
      data: { isFavorite: true },
    });
  }
}
