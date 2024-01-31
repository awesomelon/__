// core
import { Injectable } from '@nestjs/common';

// Heart
import { Heart } from './entity';
import { HeartDTO, RequestChargingHeartDTO, RequestUseHeartDTO } from './dto';
import { HeartItemService } from './heartItem.service';

// Bonus
import { BonusHeartService } from 'src/bonusHeart/bonusHeart.service';

// common
import { CommonService } from 'src/common/service/common.service';
import { errorException } from 'src/common/middleware';

// history
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class HeartService {
  constructor(
    private readonly commonService: CommonService<Heart>,
    private readonly heartItemService: HeartItemService,
    private readonly historyService: HistoryService,
    private readonly bonusHeartService: BonusHeartService,
  ) {}

  async charging(dto: RequestChargingHeartDTO, userId: number) {
    const data = {
      ...dto,
      userId,
      isUse: false,
    };

    const chargingAmount = data.amount;

    if (chargingAmount <= 0) {
      return errorException('TF441');
    }

    if (!Number.isInteger(chargingAmount)) {
      return errorException('TF440');
    }

    const heart = await this.commonService.findOne({
      where: { userId, isDeleted: false },
    });

    if (heart) {
      const heartId = heart.id;
      await this.heartItemService.insert({
        heartId,
        amount: dto.amount,
      });

      const totalAmount = await this.heartItemService.sum({
        heartId,
        isDeleted: false,
      });

      await this.historyService.insert({
        ...data,
        amount: dto.amount,
        type: 'heart',
      });

      return this.commonService.updateOne({ id: heartId }, { totalAmount });
    }

    const createHeart = await this.insert({
      ...data,
      totalAmount: dto.amount,
    });

    const heartId = createHeart.id;
    await this.heartItemService.insert({
      heartId,
      amount: dto.amount,
    });

    await this.historyService.insert({
      ...data,
      amount: dto.amount,
      type: 'heart',
    });

    return this.commonService.findOne({ where: { id: heartId } });
  }

  async use(dto: RequestUseHeartDTO, userId: number) {
    let result = null;

    const data = {
      ...dto,
      userId,
      isUse: true,
    };

    const heartAmount = await this.getHeartAmount(userId);
    const bonusHeartAmount = await this.bonusHeartService.getHeartAmount(
      userId,
    );

    const totalAmount = heartAmount + bonusHeartAmount;

    if (totalAmount < data.amount) {
      return errorException('TF444');
    }

    if (data.amount <= 0) {
      return errorException('TF445');
    }

    if (!Number.isInteger(data.amount)) {
      return errorException('TF446');
    }

    const useBonusHeart =
      bonusHeartAmount - data.amount >= 0 ? data.amount : bonusHeartAmount;

    const useHeart = data.amount - useBonusHeart;

    data['amount'] = -data['amount'];

    result = await this.bonusHeartService.use({
      ...data,
      amount: useBonusHeart,
    });

    const historyBonusHeart = {
      ...data,
      amount: useBonusHeart,
      isUse: true,
      type: 'bonusHeart',
    };

    await this.historyService.insert(historyBonusHeart);
    const heart = await this.commonService.findOne({
      where: { userId, isDeleted: false },
    });

    if (useHeart > 0 && heart) {
      await this.heartItemService.insert({
        ...data,
        amount: -useHeart,
        heartId: heart.id,
      });

      await this.historyService.insert({
        ...data,
        isUse: true,
        amount: useHeart,
        type: 'heart',
      });

      const totalAmount = await this.heartItemService.sum({
        heartId: heart.id,
        isDeleted: false,
      });

      return this.commonService.updateOne({ id: heart.id }, { totalAmount });
    }

    return result;
  }

  async getHeartAmount(userId: number) {
    const heart = await this.commonService.findOne({ where: { userId } });
    if (!heart) {
      return 0;
    }

    return heart.totalAmount;
  }

  async insert(dto: HeartDTO) {
    const entity = new Heart();
    Object.assign(entity, dto);

    return this.commonService.insert(entity);
  }
}
