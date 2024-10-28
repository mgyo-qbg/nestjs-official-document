import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { SignupResponseDto } from './dto/signupResponse.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  private readonly model = this.prisma.user;

  async create(data: Prisma.UserCreateInput): Promise<SignupResponseDto> {
    try {
      const user = await this.model.create({
        data,
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

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

  findAll() {
    return this.model.findMany();
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
