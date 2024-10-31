import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordRequestDto {
  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  @ApiProperty({ description: '현재 비밀번호' })
  now_password: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  @ApiProperty({ description: '비밀번호1' })
  new_first_password: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  @ApiProperty({ description: '비밀번호2' })
  new_second_password: string;
}
