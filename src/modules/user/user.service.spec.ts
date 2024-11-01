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
    create: jest.fn(), // PrismaService의 user.create 메서드를 모의(mock) 함수로 설정
  },
};

const mockUserLogService = {
  InsertUserLog: jest.fn(), // UserLogService의 InsertUserLog 메서드를 모의(mock) 함수로 설정
};

describe('UserService', () => {
  let service: UserService;

  // 각 테스트 전에 실행되는 초기화 작업
  beforeEach(async () => {
    // UserService와 종속성(PrismaService, UserLogService)을 포함하는 테스트 모듈 생성
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService, // 테스트할 UserService를 주입
        { provide: PrismaService, useValue: mockPrismaService }, // PrismaService를 모의(mock) 구현체로 대체
        { provide: UserLogService, useValue: mockUserLogService }, // UserLogService를 모의(mock) 구현체로 대체
      ],
    }).compile();

    // 생성된 모듈에서 UserService 인스턴스를 가져옴
    service = module.get<UserService>(UserService);
  });

  // create 메서드에 대한 테스트
  describe('create', () => {
    // 성공적인 사용자 생성과 비밀번호 해시 확인
    it('should create a user and hash the password', async () => {
      // 테스트에 사용할 DTO (Data Transfer Object) 설정
      const signupDto: SignupRequestDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123', // 해싱 전 비밀번호
      };

      // 사용자 생성 시 기대되는 반환값 정의
      const expectedUser = {
        id: expect.any(Number), // 사용자의 ID는 어떤 숫자여도 허용
        email: signupDto.email, // 사용자가 입력한 이메일
        name: signupDto.name, // 사용자가 입력한 이름
      };

      // mockPrismaService.user.create가 expectedUser를 반환하도록 설정
      mockPrismaService.user.create.mockResolvedValue(expectedUser);

      // service.create 메서드를 호출하여 실제 동작 검증
      const result = await service.create(signupDto);

      // PrismaService의 user.create 메서드가 예상된 데이터로 호출되었는지 확인
      expect(mockPrismaService.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: signupDto.email, // 이메일은 입력값과 일치해야 함
            name: signupDto.name, // 이름은 입력값과 일치해야 함
            // 비밀번호는 해시된 값으로 저장됨 (원래 비밀번호와 다른 값이어야 함)
            password: expect.any(String), // 해시된 비밀번호 형식만 확인
          }),
          select: {
            email: true, // 이메일 필드 선택
            id: true, // ID 필드 선택
            name: true, // 이름 필드 선택
          },
        }),
      );

      // service.create의 반환값이 기대되는 사용자 객체와 일치하는지 확인
      expect(result).toEqual(expectedUser);
    });

    // 이메일 중복 시 예외 처리 확인
    it('should throw HttpException if email already exists', async () => {
      // 중복 이메일을 가진 사용자 DTO 설정
      const signupDto: SignupRequestDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      // PrismaClientKnownRequestError 예외를 설정하여 중복 이메일 오류를 시뮬레이션
      const error = new PrismaClientKnownRequestError(
        'Unique constraint failed on the fields: (`email`)', // 오류 메시지
        {
          code: 'P2002', // Prisma에서 중복 항목 오류를 나타내는 코드
          clientVersion: '5.21.1', // Prisma 클라이언트 버전
          meta: { target: 'email' }, // 중복 필드 (이메일)
          batchRequestIdx: undefined, // (선택적) 일괄 요청 인덱스, 현재 필요 없음
        },
      );
      // user.create 메서드가 위에서 정의한 오류를 던지도록 설정
      mockPrismaService.user.create.mockRejectedValue(error);

      // service.create 호출 시 HttpException을 던지는지 검증
      await expect(service.create(signupDto)).rejects.toThrow(HttpException);
      // 오류 메시지와 상태 코드가 예상대로 설정되었는지 검증
      await expect(service.create(signupDto)).rejects.toThrow(
        new HttpException('Duplicate email', HttpStatus.BAD_REQUEST),
      );
    });
  });
});