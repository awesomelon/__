import { Injectable } from '@nestjs/common';

import { Heart } from './entity';
import { HeartDTO, RequestChargingHeartDTO, RequestUseHeartDTO } from './dto';

// common
import { CommonService } from 'src/common/service/common.service';

// lib
import { FindOptionsWhere, MoreThanOrEqual } from 'typeorm';
import { HistoryService } from 'src/history/history.service';
import { errorException } from 'src/common/middleware';
import { BonusHeartService } from 'src/bonusHeart/bonusHeart.service';

@Injectable()
export class HeartService {
  constructor(
    private readonly commonService: CommonService<Heart>,
    private readonly historyService: HistoryService,
    private readonly bonusHeartService: BonusHeartService,
  ) {}

  async sum(filter: FindOptionsWhere<Heart>) {
    return this.commonService.sum(filter, 'amount');
  }

  async insert(dto: HeartDTO) {
    const entity = new Heart();
    Object.assign(entity, dto);

    await this.historyService.insert({
      ...dto,
      type: 'heart',
    });

    return this.commonService.insert(entity);
  }

  async charging(heart: RequestChargingHeartDTO, userId: number) {
    const data = {
      ...heart,
      userId,
      isUse: false,
    };

    return this.insert(data);
  }

  async use(dto: RequestUseHeartDTO, userId: number) {
    let result = null;

    const data = {
      ...dto,
      userId,
      isUse: true,
    };

    const heartAmount = await this.sum({
      userId,
    });

    const bonusHeartAmount = await this.bonusHeartService.sum({
      userId,
      expiredStartAt: MoreThanOrEqual(new Date()),
      expiredEndAt: MoreThanOrEqual(new Date()),
    });

    const totalAmount = heartAmount + bonusHeartAmount;

    if (totalAmount < data.amount) {
      return errorException('TF444');
    }

    if (data.amount <= 0) {
      return errorException('TF445');
    }

    const useBonusHeart =
      bonusHeartAmount - data.amount >= 0 ? data.amount : bonusHeartAmount;

    const useHeart = data.amount - useBonusHeart;

    data['amount'] = -data['amount'];

    await this.historyService.insert({
      ...data,
      amount: -useBonusHeart,
      type: 'bonusHeart',
    });

    result = await this.bonusHeartService.use({
      ...data,
      amount: -useBonusHeart,
    });

    if (useHeart > 0) {
      await this.historyService.insert({
        ...data,
        amount: -useHeart,
        type: 'heart',
      });

      result = await this.insert(data);
    }

    return result;
  }
}
