import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, ManyToOne } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  heading: string;

  @Column()
  description: string;

  @Column()
  status: number;

  @ManyToOne(() => User, (user) => user.todos)
  user: User

  @AfterInsert()
  logInsert() {
    console.log('Inserted todo with todo Id', this.id);
  }
}
