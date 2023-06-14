import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
// import { testService1 } from './testService1';
// import { testService2 } from './testService2';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
    // testService1,
    // testService2
  ],
  controllers: [UsersController, AuthController],
})
export class UsersModule { }
