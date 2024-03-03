import { Controller, Get, UseGuards } from '@nestjs/common';

import { GetUserDto } from './dto';
import { UserService } from './user.service';

import { Response } from '../../common/interfaces';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  public getMe(@GetUser() user: GetUserDto): Response {
    return { data: user };
  }
}
