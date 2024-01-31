import { Injectable } from '@nestjs/common';

import { BonusHeart } from './entity';
import { RequestChargingBonusHeartDTO, RequestUseBonusHeartDTO } from './dto';

// User
import { UserService } from 'src/user/user.service';

// History
import { HistoryService } from 'src/history/history.service';

// Common
import { RolesType } from 'src/common/enum';
import { CommonService } from 'src/common/service/common.service';
import { errorException } from 'src/common/middleware';

// lib
import { FindOptionsWhere } from 'typeorm';
import * as dayjs from 'dayjs';

@Injectable()
export class BonusHeartService {
  constructor(
    private readonly userService: UserService,
    private readonly commonService: CommonService<BonusHeart>,
    private readonly historyService: HistoryService,
  ) {}

  async sum(filter: FindOptionsWhere<BonusHeart>) {
    return this.commonService.sum(filter, 'amount');
  }

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

    const bonus = new BonusHeart();
    Object.assign(bonus, data);

    await this.historyService.insert({
      ...data,
      type: 'bonusHeart',
    });

    return this.commonService.insert(bonus);
  }

  async use(dto: RequestUseBonusHeartDTO) {
    const data = {
      ...dto,
      isUse: true,
    };

    const entity = new BonusHeart();
    Object.assign(entity, data);

    return this.commonService.insert(entity);
  }
}
