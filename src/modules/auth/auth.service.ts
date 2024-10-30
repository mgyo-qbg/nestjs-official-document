// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { UserWorkName } from '@prisma/client';
import { UserLogService } from '../user-log/user-log.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly userLogService: UserLogService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.validateUser(email, password); // 사용자 검증
    const payload: JwtPayload = { id: user.id, email: user.email }; // JWT 페이로드 생성
    // SIGN_IN 에 대한 UserLog 로그 추가
    await this.userLogService.InsertUserLog(user.id, UserWorkName.SIGN_IN);
    return {
      accessToken: this.jwtService.sign(payload), // JWT 발급
    };
  }
}
