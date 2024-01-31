import { Injectable } from '@nestjs/common';

import { Heart } from './entity';
import { HeartDTO, RequestChargingHeartDTO, RequestUseHeartDTO } from './dto';

// common
import { CommonService } from 'src/common/service/common.service';

// lib
import { FindOptionsWhere } from 'typeorm';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class HeartService {
  constructor(
    private readonly commonService: CommonService<Heart>,
    private readonly historyService: HistoryService,
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

  async use(heart: RequestUseHeartDTO, userId: number) {
    const data = {
      ...heart,
      userId,
      isUse: true,
    };

    return this.insert(data);
  }
}
