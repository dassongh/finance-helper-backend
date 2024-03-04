import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreateWalletDto } from './dto';
import { WalletService } from './wallet.service';

import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

import { GetPagination } from '../../common/decorator';
import { Pagination } from '../../common/interfaces';

@UseGuards(JwtGuard)
@Controller('wallets')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('/')
  public async create(@GetUser('id') userId: number, @Body() dto: CreateWalletDto) {
    const wallet = await this.walletService.create(userId, dto);
    return { data: wallet };
  }

  @Get('/')
  public async get(@GetUser('id') userId: number, @GetPagination() pagination: Pagination) {
    const { wallets, count } = await this.walletService.get(userId, pagination);
    return { data: wallets, count };
  }

  @Get('/:id')
  public async getById(@GetUser('id') userId: number, @Param('id') walletId: number) {
    const wallet = await this.walletService.getById(userId, walletId);
    return { data: wallet };
  }
}
