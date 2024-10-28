import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User, UserWorkName } from '@prisma/client';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SignupResponseDto } from './dto/signupResponse.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserLogService } from '../user-log/user-log.service';
import * as bcrypt from 'bcrypt';
import { FindAllResponseDto } from './dto/findAllResponse.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly userLogService: UserLogService,
  ) {}

  private readonly model = this.prisma.user;

  async create(data: Prisma.UserCreateInput): Promise<SignupResponseDto> {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10); // 10은 saltRounds

      const user = await this.model.create({
        data: {
          ...data,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      // SIGN_UP 에 대한 UserLog 로그 추가
      await this.userLogService.InsertUserLog(user.id, UserWorkName.SIGN_UP);

      this.logger.log(
        'UserService.create() 메서드에서 쿼리한 user 객체 확인하는 로그입니다.',
        JSON.stringify(user, null, 2),
      );

      // Prisma 로 가져온 결과를 SignupResponseDto 로 변환
      const signupResponseDto = new SignupResponseDto();
      signupResponseDto.id = user.id;
      signupResponseDto.email = user.email;
      signupResponseDto.name = user.name;

      return signupResponseDto;
    } catch (error) {
      // email field 유니크 제약 조건에 대한 에러 처리
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new HttpException('Duplicate email', HttpStatus.BAD_REQUEST);
      }

      // 다른 에러들은 그대로 throw
      throw error;
    }
  }

  async findAll(): Promise<FindAllResponseDto[]> {
    const users: User[] = await this.model.findMany();

    // User 데이터를 FindAllResponseDto 로 변환
    return users.map((user) => {
      const findAllResponseDto = new FindAllResponseDto();
      findAllResponseDto.id = user.id;
      findAllResponseDto.email = user.email;
      findAllResponseDto.name = user.name;
      findAllResponseDto.grade = user.grade;

      this.logger.log(
        'UserService.findAll() 메서드에서 쿼리하여 반환하는 모든 findAllResponseDto 확인하는 로그입니다.',
        JSON.stringify(findAllResponseDto, null, 2),
      );
      return findAllResponseDto;
    });
  }

  findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.model.findUnique({
      where: userWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    return this.model.update(params);
  }

  remove(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.model.delete({
      where: userWhereUniqueInput,
    });
  }
}
