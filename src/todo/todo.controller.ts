import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UseGuards
} from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { TodoDto } from './dtos/todo.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {

  constructor(private todoService: TodoService) { }
  @Get()
  allTodos() {
    return 'all todos';
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Add a Todo' })
  @ApiResponse({
    status: 200,
    description: 'Successfully added a new todo',
  })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Forbidden',
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Internal Server Error',
  // })
  @Serialize(TodoDto)
  createTodo(@Body() body: CreateTodoDto, @CurrentUser() user: User) {
    return this.todoService.create(body, user);
  }
  @Put(':id')
  updateTodo(@Param(':id') id: string) {
    return 'todo updated';
  }

  @Delete(':id')
  removeTodo() {
    return 'todo deleted';
  }
}
