// core
import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

// User
import { BonusHeartService } from './bonusHeart.service';
import { BonusHeartController } from './bonusHeart.controller';
import { BonusHeart } from './entity';
import { UserModule } from 'src/user/user.module';
import { CommonService } from 'src/common/service/common.service';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BonusHeart]), UserModule],
  controllers: [BonusHeartController],
  providers: [
    BonusHeartService,
    {
      provide: CommonService,
      useFactory: (repository: Repository<BonusHeart>) =>
        new CommonService<BonusHeart>(repository),
      inject: [getRepositoryToken(BonusHeart)],
    },
  ],
  exports: [BonusHeartService],
})
export class BonusHeartModule {}
