import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { CurrencyType, WalletType } from '../constants';

export class CreateWalletDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { message: 'Color should be a valid hex color' })
  color: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(WalletType)
  type: WalletType;

  @IsString()
  @IsNotEmpty()
  @IsEnum(CurrencyType)
  currency: CurrencyType;

  @IsString()
  @IsOptional()
  description: string;
}
