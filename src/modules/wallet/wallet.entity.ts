import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { CurrencyType, WalletType } from './constants';

@Entity()
@Unique(['userId', 'name'])
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  userId: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({ type: 'enum', enum: WalletType })
  type: WalletType;

  @Column({ type: 'enum', enum: CurrencyType })
  currency: CurrencyType;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.wallets, { onDelete: 'CASCADE' })
  user: User;
}
