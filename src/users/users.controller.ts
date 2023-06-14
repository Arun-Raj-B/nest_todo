import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  NotFoundException,
  Session,
  UseInterceptors,
  UseGuards,
  UsePipes,
  ParseArrayPipe,
  Inject
} from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger/dist';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { ValidationPipe } from './pipes/testPipe';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('User Helpers')
@Controller('user')
// @Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
    // private authService: AuthService,
  ) { }

  // signup router
  // @ApiOperation({ summary: 'Sign up a user' })
  // @ApiCreatedResponse({
  //   description: 'Signed up successfully',
  //   type: CreateUserDto
  // })
  // @ApiInternalServerErrorResponse({
  //   description: 'Internal Server Error'
  // })
  // @Post('/signup')
  // async createUser(@Body() body: CreateUserDto, @Session() session: any) {
  //   const user = await this.authService.signup(body.email, body.password);
  //   session.userId = user.id;
  //   return user;
  // }

  @ApiOperation({ summary: 'Get a user by email' })
  @Get(':email')
  async getUser(@Param('email') email: string) {
    const user = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // // signin router
  // @ApiOperation({ summary: 'Sign in a user' })
  // @ApiCreatedResponse({
  //   description: 'Signed in successfully',
  //   type: CreateUserDto
  // })
  // @ApiInternalServerErrorResponse({
  //   description: 'Internal Server Error'
  // })
  // @Post('/signin')
  // async signIn(@Body() body: CreateUserDto, @Session() session: any) {
  //   const user = await this.authService.signin(body.email, body.password);
  //   console.log(session.userId);
  //   session.userId = user.id;
  //   return user;
  // }

  //signout router
  // @ApiOperation({ summary: 'Sign out the user' })
  // @ApiCreatedResponse({
  //   description: 'Signed out successfully',
  // })
  // @Post('/signout')
  // signOut(@Session() session: any) {
  //   session.userId = null;
  // }

  @ApiOperation({ summary: 'Get all the todos of the user' })
  @Get('/allTodos/:id')
  // @UsePipes(testPipe)
  async allUserTodo(@Param('id') id: string) {
    const returnValue = await this.usersService.allUserTodo(parseInt(id))
    await this.cacheManager.set('todoFound', returnValue, 100000);
    return returnValue;
  }

  // @ApiOperation({ summary: 'Testing query arrays' })
  // @Get()
  // TestQuery(
  //   @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
  //   ids: number[],
  // ) {
  //   return ids;
  // }

  // //signed in user
  // @ApiOperation({ summary: 'Currently signed in user' })
  // @UseGuards(AuthGuard)
  // @Get()
  // // @UsePipes(testPipe)
  // whoAmI(@CurrentUser() user: User) {
  //   return user;
  // }

  @Get('cache/:id')
  async getRecentPost(@Param('id') id: string) {
    const value = await this.cacheManager.get('todoFound');
    console.log('This is the return value', typeof value);
    return value;
  }
}
