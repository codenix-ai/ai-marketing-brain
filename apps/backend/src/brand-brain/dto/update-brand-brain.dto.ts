import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandBrainDto } from './create-brand-brain.dto';

export class UpdateBrandBrainDto extends PartialType(CreateBrandBrainDto) {}
