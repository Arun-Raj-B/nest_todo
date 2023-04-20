import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: "abc@gmail.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "password"
  })
  @IsString()
  @Length(8, 20)
  password: string;
}
