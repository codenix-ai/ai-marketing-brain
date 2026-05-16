import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { BrandBrainService } from './brand-brain.service';
import { CreateBrandBrainDto, UpdateBrandBrainDto } from './dto';

@Controller('brand-brain')
export class BrandBrainController {
  constructor(private readonly brandBrainService: BrandBrainService) {}

  @Get()
  findAll() {
    return this.brandBrainService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.brandBrainService.findBySlug(slug);
  }

  @Post()
  create(@Body() dto: CreateBrandBrainDto) {
    return this.brandBrainService.create(dto);
  }

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() dto: UpdateBrandBrainDto) {
    return this.brandBrainService.update(slug, dto);
  }
}
