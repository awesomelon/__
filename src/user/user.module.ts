// core
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

import { HelloBotUser } from './entity';
import { HeartModule } from 'src/heart/heart.module';

// User
import { UserService } from './user.service';
import { CommonService } from 'src/common/service/common.service';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HelloBotUser]), HeartModule],
  controllers: [],
  providers: [
    UserService,
    {
      provide: CommonService,
      useFactory: (repository: Repository<HelloBotUser>) =>
        new CommonService<HelloBotUser>(repository),
      inject: [getRepositoryToken(HelloBotUser)],
    },
  ],
  exports: [UserService],
})
export class UserModule {}
