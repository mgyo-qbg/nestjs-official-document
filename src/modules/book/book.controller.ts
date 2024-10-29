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
} from '@nestjs/common';
import { BookService } from './book.service';
import { UserService } from '../user/user.service';
import { RegisterBookRequestDto } from './dto/RegisterBookRequest.dto';

@Controller('book')
export class BookController {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly bookService: BookService) {}

  @Get('search')
  searchBook(@Query('query') query: string) {
    this.logger.log('검색 키워드 :', query);
    return this.bookService.searchBooks(query);
  }

  @Post('register')
  registerBook(@Body() registerBookRequestDto: RegisterBookRequestDto) {
    return this.bookService.registerBook(registerBookRequestDto);
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
