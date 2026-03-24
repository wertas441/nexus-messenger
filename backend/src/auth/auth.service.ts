import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ForgotPasswordDto, LoginDto, RegistrationDto } from './utils/auth.dto';

interface TokenPayload {
  sub: number;
  publicId: string;
  userName: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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

    const tokenPayload: TokenPayload = {
      sub: existingUser.id,
      publicId: existingUser.publicId,
      userName: existingUser.userName,
    };

    const tokens = await this.generateTokens(tokenPayload);
    await this.storeRefreshTokenHash(existingUser.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
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

    return { success: true };
  }

  public async refresh(refreshToken: string) {
    let payload: TokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<TokenPayload>(refreshToken, {
        secret:
          process.env.JWT_REFRESH_SECRET ?? 'dev_jwt_refresh_secret_change_me',
      });
    } catch {
      throw new UnauthorizedException('Некорректный refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        publicId: true,
        userName: true,
        email: true,
        createdAt: true,
        refreshTokenHash: true,
      },
    });

    if (!user?.refreshTokenHash) {
      throw new UnauthorizedException('Refresh token отозван');
    }

    const isRefreshTokenValid = await compare(
      refreshToken,
      user.refreshTokenHash,
    );
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Некорректный refresh token');
    }

    const nextPayload: TokenPayload = {
      sub: user.id,
      publicId: user.publicId,
      userName: user.userName,
    };

    const tokens = await this.generateTokens(nextPayload);
    await this.storeRefreshTokenHash(user.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        publicId: user.publicId,
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  public async logout(userId: number) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: null,
      },
    });

    return { success: true };
  }

  public forgotPassword(body: ForgotPasswordDto) {
    return `В разработке`;
  }

  public aboutUser() {
    return 'Имя';
  }

  private async generateTokens(payload: TokenPayload) {
    const accessSecret = process.env.JWT_SECRET ?? 'dev_jwt_secret_change_me';
    const refreshSecret =
      process.env.JWT_REFRESH_SECRET ?? 'dev_jwt_refresh_secret_change_me';

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: accessSecret,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshSecret,
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async storeRefreshTokenHash(userId: number, refreshToken: string) {
    const refreshTokenHash = await hash(refreshToken, 10);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash,
      },
    });
  }
}
