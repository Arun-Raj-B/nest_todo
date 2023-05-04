import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './todo.entity';
import { ViewRepository } from 'src/view.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService, ViewRepository],
  controllers: [TodoController], 
})
export class TodoModule {}
