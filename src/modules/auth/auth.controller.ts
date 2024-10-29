// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/loginRequest.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return await this.authService.signIn(
      loginRequestDto.email,
      loginRequestDto.password,
    );
  }
}
