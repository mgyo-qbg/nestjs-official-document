import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordRequestDto {
  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  now_password: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  new_first_password: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  new_second_password: string;
}
