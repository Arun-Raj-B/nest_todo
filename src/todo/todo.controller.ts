import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  @Get()
  allTodos() {
    return 'all todos';
  }

  @Post()
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
  createTodo(@Body() body: CreateTodoDto) {
    return body;
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
