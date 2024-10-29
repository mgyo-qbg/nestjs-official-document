import { IsNotEmpty, IsString } from 'class-validator';
import { BookCategory } from '@prisma/client';

export class RegisterBookRequestDto {
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
}
