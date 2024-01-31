// core
import { Injectable } from '@nestjs/common';

// Heart
import { HeartItem } from './entity/heartItem.entity';
import { HeartItemDTO } from './dto';

// common
import { CommonService } from 'src/common/service/common.service';

// lib
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class HeartItemService {
  constructor(private readonly commonService: CommonService<HeartItem>) {}

  async insert(dto: HeartItemDTO) {
    const entity = new HeartItem();
    Object.assign(entity, dto);
    return this.commonService.insert(entity);
  }

  async sum(filter: FindOptionsWhere<HeartItem>) {
    return this.commonService.sum(filter, 'amount');
  }
}
