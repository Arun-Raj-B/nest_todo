import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch
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

@ApiTags('Todo')
@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {

  constructor(private todoService: TodoService) { }
  @Get()
  allTodos() {
    return 'all todos';
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTodoDto, @CurrentUser() currentUser: User) {
    const currentUserId = currentUser.id
    return this.todoService.update(parseInt(id), body, currentUserId)
  }

  @Delete(':id')
  removeTodo() {
    return 'todo deleted';
  }
}
