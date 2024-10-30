import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BookCategory, BookStatus } from '@prisma/client';

export class FindOneResponseDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  cover_image: string;

  book_category: BookCategory;

  @IsString()
  @IsNotEmpty()
  requester_id: number;

  @IsString()
  @IsNotEmpty()
  requester_name: string;

  @IsString()
  borrower_id: number;

  @IsString()
  borrower_name: string;

  @IsNotEmpty()
  book_status: BookStatus;
}
