import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupRequestDto } from './dto/signupRequest.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() createUserDto: SignupRequestDto) {
    this.logger.log(
      'custom-logger.service 를 이용한 로그가 제대로 남는지 확인하는 테스트 요청입니다. UserController 의 signup 메서드 시작 로그입니다.',
    );
    return this.userService.create(createUserDto);
  }

  @Get()
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({
      where: { id: Number(id) },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove({ id: Number(id) });
  }
}
