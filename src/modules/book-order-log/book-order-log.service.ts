import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BookOrderLog, BookOrderLogWorkName } from '@prisma/client';

// BookOrderLogService 는 BookService 에서만 호출함
@Injectable()
export class BookOrderLogService {
  constructor(private readonly prisma: PrismaService) {}

  async InsertBookOrderLog(
    workerId: number,
    workName: BookOrderLogWorkName,
    bookId: number,
  ): Promise<BookOrderLog> {
    return this.prisma.bookOrderLog.create({
      data: {
        worker_id: workerId,
        work_name: workName,
        book_id: bookId,
      },
    });
  }
}
