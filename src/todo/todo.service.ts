import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private repo: Repository<Todo>) { }

    create(todoDto: CreateTodoDto, user: User) {
        const todo = this.repo.create(todoDto);
        todo.user = user;
        return this.repo.save(todo)
    }

    async verifyUser(todoUserId: number, currentUserId) {
        if (todoUserId !== currentUserId) {
            throw new UnauthorizedException("You are not authorized to edit this")
        }
        return true;
    }

    async update(todoId: number, attrs: Partial<Todo>, currentUserId: number) {
        const todo = await this.repo.createQueryBuilder().select("*").where({ todoId }).getRawOne();
        if (!todo) {
            throw new NotFoundException(`Todo with id : ${todoId} was not found`)
        }
        const verify = await this.verifyUser(todo.userId, currentUserId);
        if (verify) {
            Object.assign(todo, attrs)
            return this.repo.save(todo)
        }
    }
}
