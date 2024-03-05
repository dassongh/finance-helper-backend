import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { EnvVariables } from './common/constants';

import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { WalletModule } from './modules/wallet/wallet.module';

import { Category } from './modules/category/category.entity';
import { User } from './modules/user/user.entity';
import { Wallet } from './modules/wallet/wallet.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        host: config.get<string>(EnvVariables.POSTGRES_HOST),
        port: config.get<number>(EnvVariables.POSTGRES_PORT),
        username: config.get<string>(EnvVariables.POSTGRES_USER),
        password: config.get<string>(EnvVariables.POSTGRES_PASSWORD),
        database: config.get<string>(EnvVariables.POSTGRES_DB),
        entities: [User, Wallet, Category],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    WalletModule,
    CategoryModule,
  ],
})
export class AppModule {}
