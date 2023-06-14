import { IsEmail, IsString, Length, Validate, ValidateIf, ValidationArguments } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsSameType } from '../validators/CustomTextLength';
// import { CustomTextLength } from '../validators/CustomTextLength';

export class CreateUserDto {
  @ApiProperty({
    example: "abc@gmail.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "password"
  })

  //conditional validaton
  @ValidateIf(o => o.email === "abc@gmail.com")
  @IsString({
    message: "value : $value \n property : $property \n target : $target",
    // you can pass context inside 
    context: {
      blabla: "bla bla bla",
      blublu: "blu blu blu"
    }
  })
  // @Length(8, 20, {
  //   message: (args: ValidationArguments) => {
  //     if (args.value.length <= 8) {
  //       return 'Too short, minimum length is ' + args.constraints[0] + ' characters';
  //     } else if (args.value.length >= 20) {
  //       return 'Too long, maximum length is ' + args.constraints[1] + ' characters';
  //     } else {
  //       return 'Enter a string password between 8 and 20 characters'
  //     }
  //   }
  // })

  // // Custom constraints
  // @Validate(CustomTextLength, { message: "Length should be between 1 and 10" })
  @IsSameType('email', { message: "email and password must be string" })
  password: string;
  // $value - the value that is being validated
  // $property - name of the object's property being validated
  // $target - name of the object's class being validated
  // $constraint1, $constraint2, ... $constraintN - constraints defined by specific validation type
}
