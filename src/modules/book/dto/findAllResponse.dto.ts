import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BookCategory } from '@prisma/client';

export class FindAllResponseDto {
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
  requester_id;

  @IsString()
  @IsNotEmpty()
  requester_name;
}
