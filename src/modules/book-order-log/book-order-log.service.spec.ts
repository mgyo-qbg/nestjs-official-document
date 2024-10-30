import { Test, TestingModule } from '@nestjs/testing';
import { BookOrderLogService } from './book-order-log.service';

describe('BookRentalLogService', () => {
  let service: BookOrderLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookOrderLogService],
    }).compile();

    service = module.get<BookOrderLogService>(BookOrderLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
