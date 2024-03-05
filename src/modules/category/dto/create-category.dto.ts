import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CurrencyType } from '../../../common/constants';
import { CategoryType } from '../constants';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(CategoryType)
  type: CategoryType;

  @IsString()
  @IsNotEmpty()
  @IsEnum(CurrencyType)
  currency: CurrencyType;
}
