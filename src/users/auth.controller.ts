import {
    Controller, Post,
    Body,
    Param,
    Get,
    NotFoundException,
    Session,
    UseInterceptors,
    UseGuards,
    UsePipes
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
import { AuthGuard } from 'src/guards/auth.guard';
import { ValidationPipe } from './pipes/testPipe';

@ApiTags('User Auth')
@Controller('auth')
@Serialize(UserDto)
export class AuthController {
    constructor(
        // private usersService: UsersService,
        private authService: AuthService,
    ) { }

    // signup router
    @ApiOperation({ summary: 'Sign up a user' })
    @ApiCreatedResponse({
        description: 'Signed up successfully',
        type: CreateUserDto
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal Server Error'
    })
    // @UsePipes(ValidationPipe)
    // global custom validation is done
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        console.log(body)
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    // signin router
    @ApiOperation({ summary: 'Sign in a user' })
    @ApiCreatedResponse({
        description: 'Signed in successfully',
        type: CreateUserDto
    })
    @ApiInternalServerErrorResponse({
        description: 'Internal Server Error'
    })
    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        console.log(session.userId);
        session.userId = user.id;
        return user;
    }

    //signout router
    @ApiOperation({ summary: 'Sign out the user' })
    @ApiCreatedResponse({
        description: 'Signed out successfully',
    })
    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

}
