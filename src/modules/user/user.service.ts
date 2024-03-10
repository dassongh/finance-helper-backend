import { Injectable } from '@nestjs/common';

import { CreateUserDto, GetUserDto } from './dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public getUserById(id: number): Promise<GetUserDto> {
    return this.userRepository.findOne({ where: { id }, select: ['id', 'name', 'email'] });
  }

  public getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  public async createUser(dto: CreateUserDto): Promise<GetUserDto> {
    const user = await this.userRepository.save(dto);
    return { id: user.id, name: user.name, email: user.email };
  }
}
