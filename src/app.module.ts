import {
  MiddlewareConsumer, Module,
  // ValidationPipe
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';
import { User } from './users/user.entity';
import { TodoUserView } from './todoView.entity';
const cookieSession = require('cookie-session');
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ValidationPipe } from './users/pipes/testPipe';
import { CacheModule } from '@nestjs/cache-manager';


// console.log('environment', process.env.NODE_ENV)

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: `.env.${process.env.NODE_ENV}`
    // }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ( {

    //     type: 'postgres',
    //     database: 'postgres',
    //     port: 5432,
    //     host: 'localhost',
    //     username: 'postgres',
    //     password: 'Arun@2000',
    //     synchronize: true,
    //     entities: [Todo, User]
    //     // entities: [join(__dirname, "**", '*.entity.{ts,js}')]
    //   })
    // }),
    CacheModule.register({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Todo, User, TodoUserView],
      synchronize: true,
    }),
    UsersModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: APP_PIPE,
    //   useValue: new ValidationPipe({
    //     whitelist: true,
    //     transform: true
    //   }),
    // }
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe()
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: ['arunscookiesession'],
      })
    ).forRoutes('*')
  }
}
