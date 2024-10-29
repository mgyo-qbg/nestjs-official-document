import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
