// import { ViewEntity, ViewColumn, DataSource } from "typeorm"
// import { Todo } from "./todo.entity";
// import { User } from "src/users/user.entity";

// @ViewEntity({
//     name: "todo_user_view",
//     // expression: (dataSource: DataSource) => dataSource.createQueryBuilder().
//     //     select("todo.id", "id").
//     //     addSelect("todo.heading", "heading").
//     //     addSelect("user.email", "email").from(Todo, "todo").
//     //     leftJoin(User, "user", "user.id = todo.userId"),
//     // expression: `
//     // SELECT user.id as id, user.email as email
//     // FROM user 
//     // ` 
//     expression: `
//     SELECT todo.*
//     FROM todo
//     ` 
// })
// export class TodoUserView {

//     @ViewColumn()
//     id: number

//     @ViewColumn()
//     heading: string

//     @ViewColumn() 
//     email: string
// }