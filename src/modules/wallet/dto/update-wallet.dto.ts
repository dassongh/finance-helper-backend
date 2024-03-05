import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from '.';

export class UpdateWalletDto extends OmitType(PartialType(CreateWalletDto), ['type', 'currency']) {}
