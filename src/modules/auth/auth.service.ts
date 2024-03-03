import { pbkdf2 } from 'node:crypto';
import { promisify } from 'node:util';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { TokenType } from './auth.constants';
import { TokenData, TokenPayload } from './auth.interfaces';
import { SignInDto, SignUpDto } from './dto';

import { GetUserDto } from '../user/dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  public async signUp(dto: SignUpDto): Promise<GetUserDto> {
    const payload = {
      ...dto,
      password: await this.hashPassword(dto.password),
    };

    const user = await this.userRepository.save(payload);
    return { id: user.id, name: user.name, email: user.email };
  }

  public async signIn(dto: SignInDto): Promise<TokenData> {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const passwordHash = await this.hashPassword(dto.password);
    if (passwordHash !== user.password) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const tokens = {
      access: await this.signTokens({ sub: user.id }, TokenType.ACCESS),
      refresh: await this.signTokens({ sub: user.id }, TokenType.REFRESH),
    };

    return tokens;
  }

  private hashPassword(password: string): Promise<string> {
    return promisify(pbkdf2)(password, this.config.get('PASSWORD_SALT'), 1000, 64, 'sha512').then(hash =>
      hash.toString('hex')
    );
  }

  private signTokens(tokenPayload: TokenPayload, tokenType: TokenType): Promise<string> {
    const options = {
      [TokenType.ACCESS]: { secret: this.config.get('ACCESS_TOKEN_SECRET'), expiresIn: '24h' },
      [TokenType.REFRESH]: { secret: this.config.get('REFRESH_TOKEN_SECRET'), expiresIn: '30d' },
    };

    return this.jwtService.signAsync(tokenPayload, options[tokenType]);
  }
}
