import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BookRentalLog, BookRentalLogWorkName } from '@prisma/client';

// BookOrderLogService 는 BookService 에서만 호출함
@Injectable()
export class BookRentalLogService {
  constructor(private readonly prisma: PrismaService) {}

  async InsertBookRentalLog(
    workerId: number,
    workName: BookRentalLogWorkName,
    bookId: number,
  ): Promise<BookRentalLog> {
    return this.prisma.bookRentalLog.create({
      data: {
        worker_id: workerId,
        work_name: workName,
        book_id: bookId,
      },
    });
  }
}
