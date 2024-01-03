import { IsEmail, IsNotEmpty, IsString, MinLength, minLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}
