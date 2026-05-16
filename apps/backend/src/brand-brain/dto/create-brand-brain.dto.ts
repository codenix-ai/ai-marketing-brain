import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateBrandBrainDto {
  @IsString()
  slug: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  brandVoice: string;

  @IsString()
  targetAudience: string;

  @IsString()
  mainProduct: string;

  @IsString()
  uniqueValue: string;

  @IsString()
  tone: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsArray()
  forbiddenWords?: string[];

  @IsOptional()
  @IsArray()
  competitors?: string[];

  @IsOptional()
  contentExamples?: any[];
}
