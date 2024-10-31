import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '이름' })
  name: string;
}
