import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { WalletService } from './wallet.service';

@UseGuards(JwtGuard)
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}
}
