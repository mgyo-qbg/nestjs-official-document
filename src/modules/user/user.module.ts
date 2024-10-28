import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { UserLogService } from '../user-log/user-log.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserLogService],
})
export class UserModule {}
