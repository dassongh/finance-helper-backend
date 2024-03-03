import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { TokenPayload } from '../auth.interfaces';

import { EnvVariables } from '../../../common/constants';
import { UserRepository } from '../../user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(EnvVariables.ACCESS_TOKEN_SECRET),
    });
  }

  public async validate(payload: TokenPayload) {
    const user = await this.userRepository.findOne({ where: { id: payload.sub }, select: ['id', 'name', 'email'] });
    return user;
  }
}
