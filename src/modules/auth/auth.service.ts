// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.validateUser(email, password); // 사용자 검증
    const payload: JwtPayload = { id: user.id, email: user.email }; // JWT 페이로드 생성
    return {
      accessToken: this.jwtService.sign(payload), // JWT 발급
    };
  }
}
