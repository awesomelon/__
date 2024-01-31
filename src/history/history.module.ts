// core
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

// History
import { HistoryService } from './history.service';
import { History } from './entity';

// common
import { CommonService } from 'src/common/service/common.service';

// lib
import { DataSource, Repository } from 'typeorm';
import { HistoryController } from './history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  controllers: [HistoryController],
  providers: [
    HistoryService,
    {
      provide: CommonService,
      useFactory: (repository: Repository<History>, dataSource: DataSource) =>
        new CommonService<History>(repository, dataSource),
      inject: [getRepositoryToken(History), DataSource],
    },
  ],
  exports: [HistoryService],
})
export class HistoryModule {}
