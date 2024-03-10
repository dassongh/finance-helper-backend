import { Controller, Get } from '@nestjs/common';

import { GetUserId } from '../auth/decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  public getMe(@GetUserId() userId: number) {
    const user = this.userService.getUserById(userId);
    return { data: user };
  }
}
