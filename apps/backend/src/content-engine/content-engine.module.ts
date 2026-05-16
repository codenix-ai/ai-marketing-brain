import { Module } from '@nestjs/common';
import { ContentEngineService } from './content-engine.service';
import { MarketingController } from './content-engine.controller';
import { BrandBrainModule } from '../brand-brain/brand-brain.module';

@Module({
  imports: [BrandBrainModule],
  controllers: [MarketingController],
  providers: [ContentEngineService],
})
export class ContentEngineModule {}
