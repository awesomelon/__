// core
import { Injectable } from '@nestjs/common';

// Bonus
import { BonusHeartItem } from './entity';
import { BonusHeartItemDTO } from './dto';

// common
import { CommonService } from 'src/common/service/common.service';

// lib
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class BonusHeartItemService {
  constructor(private readonly commonService: CommonService<BonusHeartItem>) {}

  async insert(dto: BonusHeartItemDTO) {
    const entity = new BonusHeartItem();
    Object.assign(entity, dto);
    return this.commonService.insert(entity);
  }

  async sum(filter: FindOptionsWhere<BonusHeartItem>) {
    return this.commonService.sum(filter, 'amount');
  }
}
