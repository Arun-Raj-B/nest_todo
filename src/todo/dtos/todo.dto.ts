import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class TodoDto {
    @Expose()
    id: number;

    @Expose()
    heading: string;

    @Expose()
    description: string;

    @Expose()
    status: number;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: User
}