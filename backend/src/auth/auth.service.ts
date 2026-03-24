import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  public async login(body) {
    return this.prisma.user.findUnique({
      where: { email: body?.email },
      select: { id: true, email: true, createdAt: true },
    });
  }

  public registration(body) {
    return body;
  }

  public forgotPassword(body) {
    return body;
  }

  public aboutUser(body) {
    return body;
  }
}
