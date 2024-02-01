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

import { HistoryDTO } from 'src/history/dto';

@Injectable()
export class BonusHeartService {
  constructor(
    private readonly userService: UserService,
    private readonly commonService: CommonService<BonusHeart>,
    private readonly historyService: HistoryService,
    private readonly bonusHeartItemService: BonusHeartItemService,
  ) {}

  async charging(dto: RequestChargingBonusHeartDTO, adminId: number) {
    this.validateChargingParameters(dto);
    await this.checkUserExistence(dto.userId);

    const createdHeart = await this.createBonusHeart(dto, adminId);
    await this.createBonusHeartItem(createdHeart, dto.amount);
    await this.logHistory({
      ...dto,
      adminId,
      isUse: false,
      type: 'bonusHeart',
    });

    return this.commonService.findOne({ where: { id: createdHeart.id } });
  }

  private validateChargingParameters(dto: RequestChargingBonusHeartDTO) {
    const chargingAmount = dto.amount;

    const current = dayjs();

    const expiredStartAt = dayjs(dto.expiredStartAt);
    const expiredEndAt = dayjs(dto.expiredEndAt);

    const startDiff = current.diff(expiredStartAt);
    const endDiff = current.diff(expiredEndAt);

    if (startDiff > 0) {
      errorException('TF442');
    }

    if (endDiff > 0) {
      errorException('TF443');
    }

    if (chargingAmount <= 0) {
      errorException('TF441');
    }

    if (!Number.isInteger(chargingAmount)) {
      errorException('TF440');
    }
  }

  private async checkUserExistence(userId: number) {
    const user = await this.userService.exists({
      where: { id: userId, role: RolesType.USER },
    });

    if (!user) {
      errorException('TF003');
    }
  }

  private async createBonusHeart(
    dto: RequestChargingBonusHeartDTO,
    adminId: number,
  ) {
    return this.insert({
      ...dto,
      adminId,
      totalAmount: dto.amount,
    });
  }

  private async createBonusHeartItem(bonusHeart: BonusHeart, amount: number) {
    const bonusHeartId = bonusHeart.id;
    return this.bonusHeartItemService.insert({
      bonusHeartId,
      amount,
    });
  }

  async use(dto: RequestUseBonusHeartDTO) {
    const userId = dto.userId;
    const bonusHearts = await this.getValidBonusHearts(userId);
    await this.applyBonusHeartUsage(bonusHearts, dto.amount);
    await this.logHistory({
      ...dto,
      isUse: true,
      type: 'bonusHeart',
    });
    return this.commonService.findOne({
      where: { userId, isDeleted: false },
    });
  }

  private getValidBonusHearts(userId: number) {
    return this.commonService.find({
      where: {
        userId,
        isDeleted: false,
        expiredStartAt: MoreThanOrEqual(new Date()),
        expiredEndAt: MoreThanOrEqual(new Date()),
      },
      order: { expiredEndAt: 'ASC' },
    });
  }

  private async applyBonusHeartUsage(
    bonusHearts: BonusHeart[],
    amount: number,
  ) {
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
  }

  async getTotalBonusHeartAmount(userId: number) {
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

  private async logHistory(data: HistoryDTO): Promise<void> {
    await this.historyService.insert(data);
  }
}
