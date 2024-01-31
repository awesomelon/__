// core
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// auth
import { AuthService } from '../auth.service';

// user
import { HelloBotUser } from 'src/user/entity';

// lib
import { Strategy } from 'passport-local';

// common
import { errorException } from 'src/common/middleware';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<HelloBotUser> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      return errorException('TF003');
    }

    return user;
  }
}
