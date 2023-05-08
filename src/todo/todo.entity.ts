import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, ManyToOne, BeforeRemove, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  created!:Date; 

  @UpdateDateColumn()
  updated!:Date; 

  @DeleteDateColumn()
  deleteAt?:Date; 

  @ManyToOne(() => User, (user) => user.todos)
  user: User

  @AfterInsert()
  logInsert() {
    console.log('Inserted todo with todo Id', this.id);
  }

  @BeforeRemove()
  logRemoval() {
    console.log('removing todo of id :' + this.id)
  }
}
