import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response, NextFunction } from "express"
import { Repository } from "typeorm";
import { Todo } from "../todo.entity";

declare global {
    namespace Express {
        interface Request {
            todo: Todo
        }
    }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(@InjectRepository(Todo) private repo: Repository<Todo>) { }

    async use(req: Request, res: Response, next: NextFunction) {

        const [, id] = req.url.split('/')
        console.log(id)
        const todo = await this.repo.createQueryBuilder().select("*").where({ id }).getRawOne();
        console.log(todo)
        if (todo && todo.userId === req.session.userId) {
            req.todo = todo;
            console.log(req.todo);
            console.log("Authorized");
            next()
        } else {
            throw new UnauthorizedException("You are not authorized to edit this")
        }
    }
}