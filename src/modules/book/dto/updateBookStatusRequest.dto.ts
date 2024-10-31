import { IsNotEmpty } from 'class-validator';
import { BookStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookStatusRequestDto {
  @IsNotEmpty()
  @ApiProperty({ description: '도서 상태' })
  book_status: BookStatus;
}
