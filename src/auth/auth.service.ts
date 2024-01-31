// config
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// DTO
import { RequestLoginDTO } from './dto';

// User
import { HelloBotUser } from 'src/user/entity';
import { UserService } from 'src/user/user.service';

import { HeartService } from 'src/heart/heart.service';
import { BonusHeartService } from 'src/bonusHeart/bonusHeart.service';

// common
import { errorException } from 'src/common/middleware';

// lib
import * as bcrypt from 'bcrypt';
import { MoreThanOrEqual } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly heartService: HeartService,
    private readonly bonusService: BonusHeartService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getProfile(req) {
    const email = req.user.email;

    const user = await this.userService.findOne({
      where: { email, isDeleted: false },
      select: ['email', 'role', 'id'],
    });

    const heart = await this.heartService.sum({
      userId: user.id,
    });

    const bonus = await this.bonusService.sum({
      userId: user.id,
      expiredStartAt: MoreThanOrEqual(new Date()),
      expiredEndAt: MoreThanOrEqual(new Date()),
    });

    return {
      ...user,
      heart: heart + bonus,
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<HelloBotUser | null> {
    const user = await this.userService.findOne({
      where: { email, isDeleted: false },
    });

    if (!user) {
      return errorException('TF004');
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    if (user && !isMatch) {
      return errorException('TF554');
    }

    return user || null;
  }

  async login(data: RequestLoginDTO) {
    const { email } = data;
    const user = await this.userService.findOne({
      where: { email, isDeleted: false },
    });
    const token = await this.checkJwtToken({
      email,
      role: user.role,
      id: user.id,
    });
    return token;
  }

  async checkJwtToken(data: {
    email: string;
    role: number;
    id: number;
  }): Promise<{ access_token: string }> {
    let token = {
      access_token: this.jwtService.sign(data, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: +this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      }),
    };

    return token;
  }
}
