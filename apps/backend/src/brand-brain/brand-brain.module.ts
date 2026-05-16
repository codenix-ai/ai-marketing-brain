import { Module } from '@nestjs/common';
import { BrandBrainService } from './brand-brain.service';
import { BrandBrainController } from './brand-brain.controller';

@Module({
  controllers: [BrandBrainController],
  providers: [BrandBrainService],
  exports: [BrandBrainService],
})
export class BrandBrainModule {}
