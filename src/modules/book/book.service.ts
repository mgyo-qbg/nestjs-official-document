import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
import { SearchBooksResponseDto } from './dto/searchBooksResponse.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async searchBooks(query: string) {
    const clientId = this.configService.get<string>('NAVER_CLIENT_ID');
    const clientSecret = this.configService.get<string>('NAVER_CLIENT_SECRET');

    const response = await lastValueFrom(
      this.httpService.get('https://openapi.naver.com/v1/search/book.json', {
        params: {
          display: 10,
          query: query,
        },
        headers: {
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
      }),
    );

    const searchBooksResponseDto = new SearchBooksResponseDto();
    searchBooksResponseDto.items = response.data.items.map((item) => ({
      isbn: item.isbn,
      title: item.title,
      author: item.author,
      publisher: item.publisher,
      image: item.image,
      description: item.description,
    }));

    return searchBooksResponseDto;
  }

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
