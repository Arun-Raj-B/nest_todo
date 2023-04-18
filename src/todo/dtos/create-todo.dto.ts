import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum status {
  Pending = 1,
  Ongoing,
  Completed,
}

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  heading: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsEnum(status)
  status: status = 1;
}
