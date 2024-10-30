import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FindAllResponseDto {
  @IsNotEmpty()
  @IsNumber()
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
