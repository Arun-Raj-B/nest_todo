import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) { }

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    const className = context.getClass().name;
    const methodName = context.getHandler().name

    if (userId) {
      const user = await this.usersService.findOne(userId);
      // console.log(user)
      console.log(`Requested directed to\n -----------------------------------------\nController : ${className} \nMethod : ${methodName} `)
      request.currentUser = user;
    }

    return handler.handle();
  }
}
