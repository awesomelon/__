// core
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

// User
import { BonusHeartService } from './bonusHeart.service';
import { BonusHeartController } from './bonusHeart.controller';
import { BonusHeart } from './entity';
import { UserModule } from 'src/user/user.module';
import { CommonService } from 'src/common/service/common.service';
import { DataSource, Repository } from 'typeorm';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports: [TypeOrmModule.forFeature([BonusHeart]), UserModule, HistoryModule],
  controllers: [BonusHeartController],
  providers: [
    BonusHeartService,
    {
      provide: CommonService,
      useFactory: (
        repository: Repository<BonusHeart>,
        dataSource: DataSource,
      ) => new CommonService<BonusHeart>(repository, dataSource),
      inject: [getRepositoryToken(BonusHeart), DataSource],
    },
  ],
  exports: [BonusHeartService],
})
export class BonusHeartModule {}
