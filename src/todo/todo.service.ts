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

    async update(id: number, attrs: Partial<Todo>, currentUserId: number) {
        const todo = await this.repo.createQueryBuilder().select("*").where({ id }).getRawOne();
        if (!todo) {
            throw new NotFoundException(`Todo with id : ${id} was not found`)
        }
        else if (todo.userId !== currentUserId) {
            throw new UnauthorizedException("You are not authorized to edit this")
        }
        Object.assign(todo, attrs)
        return this.repo.save(todo)
    }
}
