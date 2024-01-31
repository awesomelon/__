import { Injectable } from '@nestjs/common';

import { BonusHeart } from './entity';
import { RequestCreateBonusHeartDTO } from './dto';

import { UserService } from 'src/user/user.service';
import { RolesType } from 'src/common/enum';
import { CommonService } from 'src/common/service/common.service';
import { errorException } from 'src/utils';

// lib
import { FindOptionsWhere } from 'typeorm';
import * as dayjs from 'dayjs';

@Injectable()
export class BonusHeartService {
  constructor(
    private readonly userService: UserService,
    private readonly commonService: CommonService<BonusHeart>,
  ) {}

  async sum(filter: FindOptionsWhere<BonusHeart>) {
    return this.commonService.sum(filter, 'amount');
  }

  async charging(dto: RequestCreateBonusHeartDTO, adminId: number, manager) {
    const data = { ...dto, adminId };

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

    return manager.getRepository(BonusHeart).save(data);
  }
}
