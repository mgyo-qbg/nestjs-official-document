import { IsNotEmpty } from 'class-validator';
import { BookStatus } from '@prisma/client';

export class UpdateBookStatusRequestDto {
  @IsNotEmpty()
  book_status: BookStatus;
}
