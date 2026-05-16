import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BrandBrainModule } from './brand-brain/brand-brain.module';
import { ContentEngineModule } from './content-engine/content-engine.module';

@Module({
  imports: [PrismaModule, BrandBrainModule, ContentEngineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
