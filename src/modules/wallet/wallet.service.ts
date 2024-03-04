import { Injectable } from '@nestjs/common';
import { Pagination } from '../../common/interfaces';
import { CreateWalletDto } from './dto';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(private walletRepository: WalletRepository) {}

  public async create(userId: number, dto: CreateWalletDto) {
    const payload = { ...dto, userId };
    const wallet = await this.walletRepository.save(payload);
    return wallet;
  }

  public async get(userId: number, { page, limit }: Pagination) {
    const offset = limit * (page - 1);
    const { 0: wallets, 1: count } = await this.walletRepository.findAndCount({
      where: { userId },
      take: limit,
      skip: offset,
    });

    return { wallets, count };
  }

  public async getById(userId: number, walletId: number) {
    const wallet = await this.walletRepository.findOne({ where: { id: walletId, userId } });
    return wallet;
  }
}
