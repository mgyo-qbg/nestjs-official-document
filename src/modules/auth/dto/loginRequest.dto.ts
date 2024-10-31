import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
