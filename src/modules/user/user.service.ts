import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User, UserWorkName } from '@prisma/client';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupResponseDto } from './dto/signupResponse.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserLogService } from '../user-log/user-log.service';
import * as bcrypt from 'bcrypt';
import { FindAllResponseDto } from './dto/findAllResponse.dto';
import { FindOneResponseDto } from './dto/findOneResponse.dto';
import { UpdatePasswordRequestDto } from './dto/updatePasswordRequestDto';
import { UpdatePasswordResponseDto } from './dto/updatePasswordResponse.Dto';

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

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<FindOneResponseDto> {
    const user = await this.model.findUnique({
      where: userWhereUniqueInput,
    });

    // 사용자 정보가 없을 경우 NotFoundException (404)을 던짐
    if (!user) {
      throw new NotFoundException(
        `Not found user by id: ${userWhereUniqueInput.id}`,
      );
    }

    const findOneResponseDto = new FindOneResponseDto();
    findOneResponseDto.id = user.id;
    findOneResponseDto.email = user.email;
    findOneResponseDto.name = user.name;
    findOneResponseDto.grade = user.grade;

    return findOneResponseDto;
  }

  async updatePassword(params: {
    data: UpdatePasswordRequestDto;
    where: { id: number };
  }): Promise<UpdatePasswordResponseDto> {
    const { data, where } = params;

    // 사용자를 ID로 검색
    const user = await this.prisma.user.findUnique({
      where: { id: where.id },
    });
    if (!user) {
      throw new NotFoundException(`Not found user by id: ${where.id}`);
    }
    // 현재 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(
      data.now_password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // 새 비밀번호 일치 여부 확인
    if (data.new_first_password !== data.new_second_password) {
      throw new BadRequestException('New passwords do not match');
    }

    // 새 비밀번호와 현재 비밀번호 다를 경우에만 비밀번호 정상 변경
    if (data.now_password == data.new_first_password) {
      throw new BadRequestException(
        'New password cannot be the same as current password',
      );
    }

    // 새 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(data.new_first_password, 10);

    // 비밀번호 업데이트
    const now_user = await this.prisma.user.update({
      where: { id: where.id },
      data: {
        password: hashedPassword, // 해시된 비밀번호를 저장
      },
    });

    // CHANGE_PASSWORD 에 대한 UserLog 로그 추가
    await this.userLogService.InsertUserLog(
      where.id,
      UserWorkName.CHANGE_PASSWORD,
    );

    const updatePasswordResponseDto = new UpdatePasswordResponseDto();
    updatePasswordResponseDto.id = now_user.id;
    updatePasswordResponseDto.email = now_user.email;
    updatePasswordResponseDto.name = now_user.name;
    updatePasswordResponseDto.grade = now_user.grade;

    return updatePasswordResponseDto;
  }

  remove(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.model.delete({
      where: userWhereUniqueInput,
    });
  }
}
