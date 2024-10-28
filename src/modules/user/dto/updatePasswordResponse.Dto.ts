import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  grade: string;
}
