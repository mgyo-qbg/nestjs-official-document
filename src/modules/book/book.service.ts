import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
import { SearchBooksResponseDto } from './dto/searchBooksResponse.dto';
import { RegisterBookRequestDto } from './dto/RegisterBookRequest.dto';
import { RegisterBookResponseDto } from './dto/RegisterBookResponse.dto';
import { SearchBooksItemResponseDto } from './dto/searchBooksItemResponse.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BookOrderLogService } from '../book-order-log/book-order-log.service';
import { BookOrderLogWorkName } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly bookOrderLogService: BookOrderLogService,
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

    // 각 item 을 SearchBooksItemResponseDto 로 변환하여 searchBooksResponseDto.items 에 저장
    searchBooksResponseDto.items = response.data.items.map((item) => {
      const searchBooksItemResponseDto = new SearchBooksItemResponseDto();
      searchBooksItemResponseDto.isbn = item.isbn;
      searchBooksItemResponseDto.title = item.title;
      searchBooksItemResponseDto.author = item.author;
      searchBooksItemResponseDto.publisher = item.publisher;
      searchBooksItemResponseDto.cover_image = item.image;

      return searchBooksItemResponseDto; // 변환된 DTO 반환
    });

    return searchBooksResponseDto;
  }

  async registerBook(
    registerBookRequestDto: RegisterBookRequestDto,
    userId: number,
  ): Promise<RegisterBookResponseDto> {
    const { isbn, title, author, publisher, cover_image, book_category } =
      registerBookRequestDto;
    try {
      const newBook = await this.model.create({
        data: {
          requester_id: userId,
          isbn,
          title,
          author,
          publisher,
          cover_image,
          book_category,
          book_status: 'REQUEST_BUY',
        },
      });

      // CHANGE_BOOK_STATUS_TO_REQUEST_BUY 에 대한 BookOrderLog 로그 추가
      await this.bookOrderLogService.InsertBookOrderLog(
        userId,
        BookOrderLogWorkName.CHANGE_BOOK_STATUS_TO_REQUEST_BUY,
        newBook.id,
      );

      const registerBookResponseDto = new RegisterBookResponseDto();
      registerBookResponseDto.isbn = newBook.isbn;
      registerBookResponseDto.title = newBook.title;
      registerBookResponseDto.author = newBook.author;
      registerBookResponseDto.publisher = newBook.publisher;
      registerBookResponseDto.cover_image = newBook.cover_image;
      registerBookResponseDto.book_category = newBook.book_category;

      return registerBookResponseDto;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // 고유제약 조건 위반 오류 코드
        if (error.code === 'P2002') {
          throw new ConflictException(`ISBN ${isbn} is already Exist'`);
        }
      }
      // 다른 오류에 대해서는 일반 오류를 던지거나 다른 방식으로 처리
      throw new InternalServerErrorException(
        '예기치 않은 오류가 발생했습니다.',
      );
    }
  }

  //   findAll();
  //   {
  //     return `This action returns all book`;
  //   }
  //
  //   findOne(id
  // :
  //   number;
  // )
  //   {
  //     return `This action returns a #${id} book`;
  //   }
  //
  //   update(id
  // :
  //   number, updateBookDto;
  // :
  //   UpdateBookDto;
  // )
  //   {
  //     return `This action updates a #${id} book`;
  //   }
  //
  //   remove(id
  // :
  //   number;
  // )
  //   {
  //     return `This action removes a #${id} book`;
  //   }
}
