import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { EnvVariables } from './common/constants';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

import { User } from './modules/user/user.entity';

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
        entities: [User],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
