import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupRequestDto } from './dto/signupRequest.dto';
import { UpdatePasswordRequestDto } from './dto/updatePasswordRequestDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @Public()
  signup(@Body() createUserDto: SignupRequestDto) {
    this.logger.log(
      'custom-logger.service 를 이용한 로그가 제대로 남는지 확인하는 테스트 요청입니다. UserController 의 signup 메서드 시작 로그입니다.',
    );
    return this.userService.create(createUserDto);
  }

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({
      id: Number(id),
    });
  }

  @Patch(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordRequestDto: UpdatePasswordRequestDto,
  ) {
    // URL 파라미터인 id 값 로그 출력
    this.logger.log(`Request User ID: ${id}`);

    // 요청 본문 데이터 로그 출력
    this.logger.log(
      `Reqeust Body: ${JSON.stringify(updatePasswordRequestDto)}`,
    );

    return this.userService.updatePassword({
      where: { id: Number(id) },
      data: updatePasswordRequestDto,
    });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
