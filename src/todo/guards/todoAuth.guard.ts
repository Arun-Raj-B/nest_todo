import { CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../todo.entity';

export class TodoAuthGuard implements CanActivate {

    constructor(@InjectRepository(Todo) private repo: Repository<Todo>) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const id = parseInt(request.params.id)

        const todo = await this.repo.createQueryBuilder().select("*").where({ id }).getRawOne();

        if (!todo) {
            throw new NotFoundException('Todo not found')
        }

        if (todo && todo.userId === request.session.userId) {
            request.todo = todo;
            return true;
        }

        return false;
    }
}