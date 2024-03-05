import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from '.';

export class UpdateCategoryDto extends OmitType(PartialType(CreateCategoryDto), ['type', 'currency']) {}
