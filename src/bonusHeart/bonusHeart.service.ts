import { Injectable } from '@nestjs/common';

import { BonusHeart } from './entity';
import {
  BonusHeartDTO,
  RequestChargingBonusHeartDTO,
  RequestUseBonusHeartDTO,
} from './dto';

// Bonus
import { BonusHeartItemService } from './bonusHeartItem.service';

// User
import { UserService } from 'src/user/user.service';

// History
import { HistoryService } from 'src/history/history.service';

// Common
import { RolesType } from 'src/common/enum';
import { CommonService } from 'src/common/service/common.service';
import { errorException } from 'src/common/middleware';

// lib
import { MoreThanOrEqual } from 'typeorm';
import * as dayjs from 'dayjs';

@Injectable()
export class BonusHeartService {
  constructor(
    private readonly userService: UserService,
    private readonly commonService: CommonService<BonusHeart>,
    private readonly historyService: HistoryService,
    private readonly bonusHeartItemService: BonusHeartItemService,
  ) {}

  async charging(dto: RequestChargingBonusHeartDTO, adminId: number) {
    const data = { ...dto, adminId, isUse: false };

    const chargingAmount = data.amount;

    const current = dayjs();
    const expiredStartAt = dayjs(data.expiredStartAt);
    const expiredEndAt = dayjs(data.expiredEndAt);

    const startDiff = current.diff(expiredStartAt);
    const endDiff = current.diff(expiredEndAt);

    if (startDiff > 0) {
      return errorException('TF442');
    }

    if (endDiff > 0) {
      return errorException('TF443');
    }

    if (chargingAmount <= 0) {
      return errorException('TF441');
    }

    if (!Number.isInteger(chargingAmount)) {
      return errorException('TF440');
    }

    const user = await this.userService.exists({
      where: { id: dto.userId, role: RolesType.USER },
    });

    if (!user) {
      return errorException('TF003');
    }

    const createHeart = await this.insert({
      ...data,
      totalAmount: dto.amount,
    });

    const bonusHeartId = createHeart.id;

    await this.bonusHeartItemService.insert({
      bonusHeartId,
      amount: dto.amount,
    });

    await this.historyService.insert({
      ...data,
      amount: dto.amount,
      type: 'bonusHeart',
    });

    return this.commonService.findOne({ where: { id: bonusHeartId } });
  }

  async use(dto: RequestUseBonusHeartDTO) {
    const userId = dto.userId;
    const bonusHearts = await this.commonService.find({
      where: {
        userId,
        isDeleted: false,
        expiredStartAt: MoreThanOrEqual(new Date()),
        expiredEndAt: MoreThanOrEqual(new Date()),
      },
      order: { createdAt: 'ASC' },
    });

    let amount = dto.amount;
    let cursor = 0;
    while (amount > 0) {
      const bonusHeart = bonusHearts[cursor];
      const bonusHeartId = bonusHeart.id;
      const bonusHeartAmount = bonusHeart.totalAmount;

      const useAmount =
        bonusHeartAmount - amount >= 0 ? amount : bonusHeartAmount;
      await this.bonusHeartItemService.insert({
        bonusHeartId,
        amount: -useAmount,
      });

      const totalAmount = await this.bonusHeartItemService.sum({
        bonusHeartId,
        isDeleted: false,
      });

      await this.commonService.updateOne({ id: bonusHeartId }, { totalAmount });

      amount = amount - useAmount;
      cursor++;
    }

    return this.commonService.findOne({
      where: { userId, isDeleted: false },
    });
  }

  async getHeartAmount(userId: number) {
    const totalAmount = await this.commonService.sum(
      {
        userId,
        expiredStartAt: MoreThanOrEqual(new Date()),
        expiredEndAt: MoreThanOrEqual(new Date()),
      },
      'totalAmount',
    );

    return totalAmount;
  }

  async insert(dto: BonusHeartDTO) {
    const entity = new BonusHeart();
    Object.assign(entity, dto);
    return this.commonService.insert(entity);
  }
}
