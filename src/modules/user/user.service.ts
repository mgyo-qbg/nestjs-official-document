import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  private readonly model = this.prisma.user;

  create(data: Prisma.UserCreateInput) {
    return this.model.create({ data });
  }

  findAll() {
    return this.model.findMany();
  }

  findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.model.findUnique({
      where: userWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    return this.model.update(params);
  }

  remove(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.model.delete({
      where: userWhereUniqueInput,
    });
  }
}
