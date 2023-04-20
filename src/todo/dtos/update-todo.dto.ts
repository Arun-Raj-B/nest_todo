import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum status {
    Pending = 1,
    Ongoing,
    Completed,
}

export class UpdateTodoDto {
    @ApiProperty({ example: 'Todo 1' })
    @IsString()
    @IsOptional()
    heading: string;

    @ApiProperty({ example: "This is my first todo" })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({ enum: ['Pending', 'Ongoing', 'Completed'] })
    @IsEnum(status)
    @IsOptional()
    status: status = status.Pending;
}