import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookService } from './book.service';
import { UserService } from '../user/user.service';
import { RegisterBookRequestDto } from './dto/RegisterBookRequest.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

// JWT에서 사용자 정보 타입 정의
interface User {
  id: number; // 사용자 ID 타입 정의
  email: string; // 필요한 경우 이메일도 추가
}

interface AuthRequest extends ExpressRequest {
  user: User; // 사용자 객체를 AuthRequest에 추가
}

@Controller('book')
@UseGuards(JwtAuthGuard)
export class BookController {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly bookService: BookService) {}

  @Get('search')
  searchBook(@Query('query') query: string) {
    this.logger.log('검색 키워드:', query);
    return this.bookService.searchBooks(query);
  }

  @Post('register')
  registerBook(
    @Body() registerBookRequestDto: RegisterBookRequestDto,
    @Request() req: AuthRequest, // AuthRequest 타입 사용
  ) {
    const userId = req.user.id; // 사용자 ID 추출
    return this.bookService.registerBook(registerBookRequestDto, userId);
  }

  // @Get()
  // findAll() {
  //   return this.bookService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bookService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.bookService.update(+id, updateBookDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bookService.remove(+id);
  // }
}
