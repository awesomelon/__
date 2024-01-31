// core
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

// Heart
import { HeartService } from './heart.service';
import { HeartController } from './heart.controller';
import { Heart } from './entity';

// common
import { CommonService } from 'src/common/service/common.service';

// lib
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Heart])],
  controllers: [HeartController],
  providers: [
    HeartService,
    {
      provide: CommonService,
      useFactory: (repository: Repository<Heart>) =>
        new CommonService<Heart>(repository),
      inject: [getRepositoryToken(Heart)],
    },
  ],
  exports: [HeartService],
})
export class HeartModule {}
