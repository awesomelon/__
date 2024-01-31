// core
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

// Heart
import { HeartItemService } from './heartItem.service';
import { HeartItem } from './entity';

// common
import { CommonService } from 'src/common/service/common.service';

// lib
import { DataSource, Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HeartItem])],
  controllers: [],
  providers: [
    HeartItemService,
    {
      provide: CommonService,
      useFactory: (repository: Repository<HeartItem>, dataSource: DataSource) =>
        new CommonService<HeartItem>(repository, dataSource),
      inject: [getRepositoryToken(HeartItem), DataSource],
    },
  ],
  exports: [HeartItemService],
})
export class HeartItemModule {}
