import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ValidationPipe 전역 적용
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // DTO에 정의된 속성만 허용할지 안할지(영호님 -> 해당 옵션 관련 이슈가 있었어서 팀에서는 해당 옵션 끄고 사용중)
      forbidNonWhitelisted: false, // 정의되지 않은 속성이 있으면 오류 발생시킬지 안시킬지
      transform: true, // 요청 데이터를 자동으로 DTO 타입으로 변환시킬지 않시킬지
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
