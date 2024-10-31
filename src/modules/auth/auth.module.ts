import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserLogService } from '../user-log/user-log.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' }, // 토큰 유효기간 1시간(86400s), 임의로 7d 로 잡음.
      }),
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, ConfigService, UserLogService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
