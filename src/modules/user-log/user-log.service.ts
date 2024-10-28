import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserLog, UserWorkName } from '@prisma/client';

// UserLogService 는 UserService 에서만 호출함
@Injectable()
export class UserLogService {
  constructor(private readonly prisma: PrismaService) {}

  async InsertUserLog(
    workerId: number,
    workName: UserWorkName,
  ): Promise<UserLog> {
    return this.prisma.userLog.create({
      data: {
        worker_id: workerId,
        work_name: workName,
      },
    });
  }
}
