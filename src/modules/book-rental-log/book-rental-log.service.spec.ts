import { Test, TestingModule } from '@nestjs/testing';
import { BookRentalLogService } from './book-rental-log.service';

describe('BookRentalLogService', () => {
  let service: BookRentalLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookRentalLogService],
    }).compile();

    service = module.get<BookRentalLogService>(BookRentalLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
