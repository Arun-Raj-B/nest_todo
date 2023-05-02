import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { User } from 'src/users/user.entity';
import { getRepository } from 'typeorm';
import { TodoUserView } from 'src/todoView.entity';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private repo: Repository<Todo>) { }

    create(todoDto: CreateTodoDto, user: User) {
        const todo = this.repo.create(todoDto);
        todo.user = user;
        return this.repo.save(todo)
    }

    // verifyUser(todoUserId: number, currentUserId: number) {
    //     if (todoUserId !== currentUserId) {
    //         throw new UnauthorizedException("You are not authorized to edit this")
    //     }
    //     return true;
    // }

    async update(attrs: Partial<Todo>, todo: Todo) {
        Object.assign(todo, attrs)
        return this.repo.save(todo)
    }

    remove(todo: Todo) {
        return this.repo.remove(todo);
    }

    todoAndUser(id: number) {
        return this.repo.createQueryBuilder("todo").
            innerJoinAndSelect("todo.user", "user", "user.id = :id", { id: id }).
            getMany()
    }

    async testView() {
        console.log("testView working")
        const todoUserRepository = getRepository(TodoUserView)

        console.log("todoUserRepository working")

        const viewData = await todoUserRepository.find()
        return viewData
    }

}
