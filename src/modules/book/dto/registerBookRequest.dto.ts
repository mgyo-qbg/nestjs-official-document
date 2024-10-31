import { IsNotEmpty, IsString } from 'class-validator';
import { BookCategory } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterBookRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '국제표준도서번호' })
  isbn: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '도서 제목' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '도서 저자' })
  author: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '도서 출판사' })
  publisher: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '도서 커버 이미지' })
  cover_image: string;

  @ApiProperty({ description: '도서 카테고리' })
  book_category: BookCategory;
}
