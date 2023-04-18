import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('User Auth')
@Controller('auth')
export class UsersController {
  @Post('/signup')
  signUp() {
    return 'root for signup';
  }

  @Post('/signin')
  signIn() {
    return 'root for signIn';
  }
}
