import { Injectable } from '@nestjs/common';

import { CreateSessionDto } from './dto';
import { SessionRepository } from './session.repository';

@Injectable()
export class SessionService {
  constructor(private sessionRepository: SessionRepository) {}

  public createOrUpdate(dto: CreateSessionDto) {
    return this.sessionRepository.save(dto);
  }

  public get(userId: number, clientId: string) {
    return this.sessionRepository.findOne({ where: { userId, clientId } });
  }

  public delete(userId: number, clientId: string) {
    return this.sessionRepository.delete({ userId, clientId });
  }
}
