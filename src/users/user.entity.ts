import { Todo } from '../todo/todo.entity';
import { AfterInsert, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[]

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with userId', this.id);
  }
}
