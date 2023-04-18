import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@ApiTags('User Auth')
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Sign up a user' })
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password);
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter an id',
    required: true,
  })
  @Serialize(UserDto)
  @Get('/user/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('/signin')
  signIn(@Body() body: CreateUserDto) {}
}
