import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum status {
  Pending = 1,
  Ongoing,
  Completed,
}

export class CreateTodoDto {
  @ApiProperty({ example: 'Todo 1' })
  @IsString()
  heading: string;

  @ApiProperty({ example: "This is my first todo" })
  @IsString()
  description: string;

  @ApiProperty({ enum: ['Pending', 'Ongoing', 'Completed'] })
  @IsEnum(status)
  status: status
}

