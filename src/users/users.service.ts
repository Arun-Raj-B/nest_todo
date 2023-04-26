import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Todo } from 'src/todo/todo.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async create(email: string, password: string) {
    const user = await this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    const user = await this.repo.findOneBy({ id });
    return user;
  }

  async find(email: string) {
    const user = await this.repo.find({ where: { email } });
    return user;
  }

  async test() {

    // don't user serialize decorator in the controller when using this route
    const id = 2;

    const testData =
      await this.repo
        .createQueryBuilder()
        .relation(User, 'todos')
        .of(id)
        .loadMany();
    return testData;
  }

}
