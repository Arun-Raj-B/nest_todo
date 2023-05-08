import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { User } from 'src/users/user.entity';
import { getRepository, Connection } from 'typeorm';
import { TodoUserView } from 'src/todoView.entity';
import { ViewRepository } from 'src/view.repository';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private repo: Repository<Todo>,
        // @InjectRepository(ViewRepository) private viewRepo: ViewRepository
        @InjectConnection() private connection: Connection
    ) { }


    find() {
        return this.repo.find()
    }

    restore(id: number) {
        return this.repo.createQueryBuilder().restore().where("id = :id", { id }).execute()
    }

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

    softDelete(id: number) {
        return this.repo.createQueryBuilder().softDelete().where("id = :id", { id }).execute();
    }

    todoAndUser(id: number) {
        return this.repo.createQueryBuilder("todo").
            innerJoinAndSelect("todo.user", "user", "user.id = :id", { id: id }).
            getMany()
    }

    async testView() {
        console.log("testView working")
        // const todoUserRepository = getRepository(TodoUserView)

        // console.log("todoUserRepository working")

        // const viewData = await todoUserRepository.find()
        // return viewData

        // console.log("before function");
        // const view = await this.viewRepo.find();
        // console.log("View found")
        // return view

        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.connect;
            const result = await queryRunner.query("SELECT * FROM user")
            console.log(result);
            return result;
        } finally {
            await queryRunner.release()
        }
    }
}
