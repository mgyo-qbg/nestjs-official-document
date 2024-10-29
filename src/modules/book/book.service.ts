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

  private readonly model = this.prisma.book;

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

    // 각 item을 SearchBooksItemResponseDto로 변환하여 items에 저장
    searchBooksResponseDto.items = response.data.items.map((item) => {
      const searchBooksItemResponseDto = new SearchBooksItemResponseDto();
      searchBooksItemResponseDto.isbn = item.isbn;
      searchBooksItemResponseDto.title = item.title;
      searchBooksItemResponseDto.author = item.author;
      searchBooksItemResponseDto.publisher = item.publisher;
      searchBooksItemResponseDto.image = item.image;

      return searchBooksItemResponseDto; // 변환된 DTO 반환
    });

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
