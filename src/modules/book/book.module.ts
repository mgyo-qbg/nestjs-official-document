import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookOrderLogService } from '../book-order-log/book-order-log.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ConfigModule, HttpModule, UserModule],
  controllers: [BookController],
  providers: [BookService, BookOrderLogService],
})
export class BookModule {}
