import { IsString } from 'class-validator';

export class SearchBooksItemResponseDto {
  @IsString()
  isbn: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  publisher: string;

  @IsString()
  image: string;

  @IsString()
  description: string;
}
