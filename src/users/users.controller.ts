import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
  Session,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('User Auth')
@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // signup router
  @ApiOperation({ summary: 'Sign up a user' })
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @Get('/user/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // signin router
  @ApiOperation({ summary: 'Sign in a user' })
  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    console.log(session.userId);
    session.userId = user.id;
    return user;
  }

  //signout router
  @ApiOperation({ summary: 'Sign out the user' })
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  //signed in user
  @ApiOperation({ summary: 'Currently signed in user' })
  @UseGuards(AuthGuard)
  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
