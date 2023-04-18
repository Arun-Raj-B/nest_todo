import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { NotFoundError } from 'rxjs';

@ApiTags('User Auth')
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password);
  }

  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter an id',
    required: true,
  })
  @Get('/user/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    console.log(user);
    if (user) {
      return user;
    }
    throw NotFoundError;
  }
  @Post('/signin')
  signIn(@Body() body: CreateUserDto) {}
}
