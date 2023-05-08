import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
  Put
} from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';

import { ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { TodoDto } from './dtos/todo.dto';
import { Todo } from './todo.entity';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { UpdateTodo } from './decorators/todo.decorator';
import { TodoAuthGuard } from './guards/todoAuth.guard';

@ApiTags('Todo')
@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {

  constructor(private todoService: TodoService) { }
  @Get()
  allTodos() {
    return this.todoService.find();
  }

  @ApiOperation({ summary: 'Add a Todo' })
  @ApiCreatedResponse({
    description: 'Successfully added a new todo',
    type: CreateTodoDto
  })
  @ApiForbiddenResponse({
    description: "Forbidden"
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error'
  })
  @Post()
  @Serialize(TodoDto)
  create(@Body() body: CreateTodoDto, @CurrentUser() user: User) {
    return this.todoService.create(body, user);
  }

  @ApiOperation({ summary: 'Edit a todo' })
  @ApiCreatedResponse({
    description: 'Successfully updated the todo',
    type: UpdateTodoDto
  })

  @Patch(':id')
  @UseGuards(TodoAuthGuard)
  update(@Param('id') id: string, @Body() body: UpdateTodoDto, @UpdateTodo() todo: Todo) {
    return this.todoService.update(body, todo)
  }

  @ApiOperation({ summary: 'Delete a todo' })
  @Delete(':id')
  @UseGuards(TodoAuthGuard)
  removeTodo(@Param('id') id: string, @UpdateTodo() todo: Todo) {
    // return this.todoService.remove(todo);
    return this.todoService.softDelete(parseInt(id))
  }

  @ApiOperation({ summary: 'Restore a todo' })
  @Get(':id')
  restoreTodo(@Param('id') id: string) {
    // return this.todoService.remove(todo);
    return this.todoService.restore(parseInt(id))
  }

  @ApiOperation({ summary: 'Get all todos with corresponding user' })
  @Get('/allDetails/:id')
  todoAndUser(@Param('id') id: string,) {
    return this.todoService.todoAndUser(parseInt(id))
  }


  @ApiOperation({ summary: 'Test view' })
  @Get('/testView')
  testView() {
    return this.todoService.testView()
  }
}
