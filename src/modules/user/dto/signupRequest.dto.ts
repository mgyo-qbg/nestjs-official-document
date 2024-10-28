import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignupRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
