import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
    name: "todo_user_view",
    expression: `
     SELECT * FROM todos  
    `
})
export class TodoUserView {

    @ViewColumn()
    id: number

    @ViewColumn()
    heading: string

    @ViewColumn()
    email: string
}



// SELECT "todo"."id" AS "id", "todo"."heading" AS "heading", "user"."email" AS "email" FROM "todos" "todo"
//     LEFT JOIN "users" "user" ON "todo"."userId" = "user.id"