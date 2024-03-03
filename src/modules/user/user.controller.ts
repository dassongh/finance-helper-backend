import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { User } from './user.entity';
import { UserService } from './user.service';

import { Response } from '../../common/interfaces';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  public getMe(@GetUser() user: User): Response {
    return { data: user };
  }

  @Get(':id')
  public async getById(@Param('id') id: number): Promise<Response> {
    const user = await this.userService.getById(id);
    return { data: user };
  }
}
