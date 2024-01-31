// config
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Auth
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// Strategy
import { JwtStrategy, LocalStrategy } from './strategy';

// User
import { UserModule } from 'src/user/user.module';

// Heart
import { HeartModule } from 'src/heart/heart.module';
import { BonusHeartModule } from 'src/bonusHeart/bonusHeart.module';

@Module({
  imports: [
    PassportModule,
    UserModule,
    HeartModule,
    BonusHeartModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
