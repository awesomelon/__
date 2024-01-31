// core
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

// Bonus
import { BonusHeartItem } from './entity';
import { BonusHeartItemService } from './bonusHeartItem.service';

// Common
import { CommonService } from 'src/common/service/common.service';

// lib
import { DataSource, Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BonusHeartItem])],
  controllers: [],
  providers: [
    BonusHeartItemService,
    {
      provide: CommonService,
      useFactory: (
        repository: Repository<BonusHeartItem>,
        dataSource: DataSource,
      ) => new CommonService<BonusHeartItem>(repository, dataSource),
      inject: [getRepositoryToken(BonusHeartItem), DataSource],
    },
  ],
  exports: [BonusHeartItemService],
})
export class BonusHeartItemModule {}
