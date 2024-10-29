import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UserModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
