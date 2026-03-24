import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegistrationDto } from './utils/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  public async login(requestBody: LoginDto) {
    const email = requestBody.email.trim().toLowerCase();
    const password = requestBody.password.trim();

    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        publicId: true,
        userName: true,
        email: true,
        passwordHash: true,
        createdAt: true,
      },
    });

    if (!existingUser) {
      throw new UnauthorizedException('Неправильно введенная почта или пароль');
    }

    const isPasswordValid = await compare(password, existingUser.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неправильно введенная почта или пароль');
    }

    return {
      user: {
        id: existingUser.id,
        publicId: existingUser.publicId,
        userName: existingUser.userName,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
      },
    };
  }

  public async registration(requestBody: RegistrationDto) {
    const email = requestBody.email.trim().toLowerCase();
    const userName = requestBody.userName.trim();

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { userName }],
      },
      select: {
        email: true,
        userName: true,
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictException(
          'Пользователь с таким email уже существует',
        );
      }

      throw new ConflictException('Пользователь с таким именем уже существует');
    }

    const passwordHash = await hash(requestBody.password, 10);

    await this.prisma.user.create({
      data: {
        email,
        userName,
        passwordHash,
      },
    });

    return true;
  }

  public forgotPassword(body) {
    return body;
  }

  public aboutUser() {
    return 'Имя';
  }
}
