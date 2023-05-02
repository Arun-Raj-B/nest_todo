import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
    name: "todo_user_view",
    expression: `
    SELECT "todo"."id" AS "id", "todo"."heading" AS "heading", "user"."email" AS "email" FROM "todo" "todo"
    LEFT JOIN "user" "user" ON "todo"."userId" = "user.id"  
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