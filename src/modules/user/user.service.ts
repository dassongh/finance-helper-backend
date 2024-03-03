import { Injectable } from '@nestjs/common';

import { GetUserDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async getById(id: number): Promise<GetUserDto> {
    const user = await this.userRepository.findOneOrFail({ where: { id }, select: ['id', 'name', 'email'] });
    return user;
  }
}
