// core
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

// User
import { HelloBotUser } from './entity';
import { UserService } from './user.service';

// common
import { CommonService } from 'src/common/service/common.service';

// lib
import { DataSource, Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HelloBotUser])],
  controllers: [],
  providers: [
    UserService,
    {
      provide: CommonService,
      useFactory: (
        repository: Repository<HelloBotUser>,
        dataSource: DataSource,
      ) => new CommonService<HelloBotUser>(repository, dataSource),
      inject: [getRepositoryToken(HelloBotUser), DataSource],
    },
  ],
  exports: [UserService],
})
export class UserModule {}
