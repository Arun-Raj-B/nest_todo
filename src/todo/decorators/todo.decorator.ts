import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const EditTodo = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.todo;
    },
);