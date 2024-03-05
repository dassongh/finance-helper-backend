import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { CreateWalletDto, UpdateWalletDto } from './dto';
import { WalletService } from './wallet.service';

import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

import { GetPagination } from '../../common/decorator';
import { FindOneParams } from '../../common/dto';
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
  public async getById(@GetUser('id') userId: number, @Param() { id }: FindOneParams) {
    const wallet = await this.walletService.getById(userId, id);
    return { data: wallet };
  }

  @Put('/:id')
  public async update(@GetUser('id') userId: number, @Param() { id }: FindOneParams, @Body() dto: UpdateWalletDto) {
    const wallet = await this.walletService.update(userId, id, dto);
    return { data: wallet };
  }

  @Delete('/:id')
  public async delete(@GetUser('id') userId: number, @Param() { id }: FindOneParams) {
    await this.walletService.delete(userId, id);
    return { status: 'ok' };
  }
}
