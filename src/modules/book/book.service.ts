import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
import { SearchBooksResponseDto } from './dto/searchBooksResponse.dto';
import { RegisterBookRequestDto } from './dto/registerBookRequest.dto';
import { RegisterBookResponseDto } from './dto/registerBookResponse.dto';
import { SearchBooksItemResponseDto } from './dto/searchBooksItemResponse.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BookOrderLogService } from '../book-order-log/book-order-log.service';
import { Book, BookOrderLogWorkName, Prisma } from '@prisma/client';
import { UserService } from '../user/user.service';
import { FindAllResponseDto } from './dto/findAllResponse.dto';
import { FindOneResponseDto } from './dto/findOneResponse.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly bookOrderLogService: BookOrderLogService,
    private readonly userService: UserService,
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

  async findAll(): Promise<FindAllResponseDto[]> {
    const books: Book[] = await this.model.findMany();

    // 프로미스 배열 생성
    const findAllResponseDtos = books.map(async (book) => {
      const findAllResponseDto = new FindAllResponseDto();
      findAllResponseDto.id = book.id;
      findAllResponseDto.isbn = book.isbn;
      findAllResponseDto.title = book.title;
      findAllResponseDto.author = book.author;
      findAllResponseDto.publisher = book.publisher;
      findAllResponseDto.cover_image = book.cover_image;
      findAllResponseDto.book_category = book.book_category;
      findAllResponseDto.requester_id = book.requester_id;
      findAllResponseDto.book_status = book.book_status;

      // 구매 요청자 정보
      const requester = await this.userService.findOne({
        id: Number(book.requester_id),
      });
      findAllResponseDto.requester_name = requester.name;

      // 도서 대여자 정보
      findAllResponseDto.borrower_id = book.borrower_id;
      // borrower_id가 null인지 확인 및 이름 확인
      if (book.borrower_id !== null) {
        const borrower = await this.userService.findOne({
          id: Number(book.borrower_id),
        });
        findAllResponseDto.borrower_name = borrower.name;
      } else {
        findAllResponseDto.borrower_name = null;
      }

      return findAllResponseDto;
    });

    // 모든 프로미스가 해결될 때까지 기다리기
    return Promise.all(findAllResponseDtos);
  }

  async findOne(
    bookWhereUniqueInput: Prisma.BookWhereUniqueInput,
  ): Promise<FindOneResponseDto> {
    const book = await this.model.findUnique({
      where: bookWhereUniqueInput,
    });

    // 도서 정보가 없을 경우 NotFoundException (404)을 던짐
    if (!book) {
      throw new NotFoundException(
        `Not found user by id: ${bookWhereUniqueInput.id}`,
      );
    }
    // 사용자 정보 가져오기
    const requester = await this.userService.findOne({
      id: Number(book.requester_id),
    });

    const findOneResponseDto = new FindOneResponseDto();
    findOneResponseDto.id = book.id;
    findOneResponseDto.isbn = book.isbn;
    findOneResponseDto.title = book.title;
    findOneResponseDto.author = book.author;
    findOneResponseDto.publisher = book.publisher;
    findOneResponseDto.cover_image = book.cover_image;
    findOneResponseDto.book_category = book.book_category;
    findOneResponseDto.requester_id = book.requester_id;
    findOneResponseDto.requester_name = requester.name;
    findOneResponseDto.book_status = book.book_status;

    return findOneResponseDto;
  }

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
