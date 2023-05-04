import { EntityRepository, Repository } from "typeorm";
import { TodoUserView } from "./todoView.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
@EntityRepository(TodoUserView)
export class ViewRepository extends Repository<TodoUserView>{

}