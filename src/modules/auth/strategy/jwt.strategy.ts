import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { UserRepository } from '../../user/user.repository';

import { TokenPayload } from '../auth.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('ACCESS_TOKEN_SECRET'),
    });
  }

  public async validate(payload: TokenPayload) {
    const user = await this.userRepository.findOne({ where: { id: payload.sub }, select: ['id', 'name', 'email'] });
    return user;
  }
}
