import { IsString, IsObject } from 'class-validator';

export class GenerateContentDto {
  @IsString()
  brandSlug: string;

  @IsString()
  taskSlug: string;

  @IsObject()
  inputs: Record<string, string>;
}
