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

import { CurrencyType } from '../../common/constants';
import { User } from '../user/user.entity';
import { CategoryType } from './constants';

@Entity()
@Unique(['userId', 'name'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  userId: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: CategoryType })
  type: CategoryType;

  @Column({ type: 'enum', enum: CurrencyType })
  currency: CurrencyType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.categories, { onDelete: 'CASCADE' })
  user: User;
}
