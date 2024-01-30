// core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// User
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { HelloBotUser } from './entity';
import { UserController } from './user.controller';
import { CommonHeartModule } from 'src/commonHeart/commonHeart.module';

@Module({
  imports: [TypeOrmModule.forFeature([HelloBotUser]), CommonHeartModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
