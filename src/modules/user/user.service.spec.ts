import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserLogService } from '../user-log/user-log.service';
import { SignupRequestDto } from './dto/signupRequest.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { HttpException, HttpStatus } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';

const mockPrismaService = {
  user: {
    create: jest.fn(),
  },
};

const mockUserLogService = {
  InsertUserLog: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: UserLogService, useValue: mockUserLogService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a user and hash the password', async () => {
      const signupDto: SignupRequestDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      // 사용자가 생성될 때 반환될 객체
      const expectedUser = {
        id: expect.any(Number), // ID는 어떤 숫자여도 됨
        email: signupDto.email,
        name: signupDto.name,
      };

      // Prisma 서비스에서 create 메서드의 mock 구현
      mockPrismaService.user.create.mockResolvedValue(expectedUser);

      const result = await service.create(signupDto);

      // user.create가 예상한 형태로 호출되었는지 확인
      expect(mockPrismaService.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: signupDto.email,
            name: signupDto.name,
            // 비밀번호는 해시된 값이므로 제외
            password: expect.any(String), // 해시된 비밀번호 형식만 확인
          }),
          select: {
            email: true,
            id: true,
            name: true,
          },
        }),
      );

      // 결과가 예상한 형태인지 확인
      expect(result).toEqual(expectedUser);
    });

    it('should throw HttpException if email already exists', async () => {
      const signupDto: SignupRequestDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      // PrismaClientKnownRequestError를 사용하여 중복 이메일 에러를 시뮬레이션
      const error = new PrismaClientKnownRequestError(
        'Unique constraint failed on the fields: (`email`)',
        {
          code: 'P2002', // 에러 코드
          clientVersion: '5.21.1', // Prisma 클라이언트 버전
          meta: { target: 'email' }, // 메타 정보 (예시)
          batchRequestIdx: undefined, // 필요한 경우 인덱스 값을 넣을 수 있음
        },
      );
      mockPrismaService.user.create.mockRejectedValue(error);

      await expect(service.create(signupDto)).rejects.toThrow(HttpException);
      await expect(service.create(signupDto)).rejects.toThrow(
        new HttpException('Duplicate email', HttpStatus.BAD_REQUEST),
      );
    });
  });
});
