// config
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// DTO
import { RequestLoginDTO } from './dto';

// User
import { HelloBotUser } from 'src/user/entity';
import { UserService } from 'src/user/user.service';

// utils
import { errorException } from 'src/utils';

// lib
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<HelloBotUser | null> {
    const user = await this.userService.findOne({ where: { email } });

    if (!user) {
      return errorException(
        404,
        '존재하지 않는 이메일입니다. 이메일을 확인해 주세요.',
      );
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    if (user && !isMatch) {
      return errorException(403, '비밀번호를 확인해주세요.');
    }

    return user || null;
  }

  async login(data: RequestLoginDTO) {
    const { email } = data;
    const user = await this.userService.findOne({ where: { email } });
    const token = await this.checkJwtToken({ email, role: user.role });
    return token;
  }

  async checkJwtToken(data: {
    email: string;
    role: number;
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
