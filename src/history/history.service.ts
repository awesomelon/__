// core
import { Injectable } from '@nestjs/common';

import { History } from './entity';

// Common
import { CommonService } from 'src/common/service/common.service';

// lib
import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { HistoryDTO, RequestHistoryDTO } from './dto';

@Injectable()
export class HistoryService {
  constructor(private readonly commonService: CommonService<History>) {}

  async list(filter: RequestHistoryDTO, userId: number) {
    const items = await this.find({
      where: {
        userId,
        isUse: false,
      },
      skip: filter.skip,
      take: filter.limit,
      order: { createdAt: 'DESC' },
    });

    const totalCount = await this.count({
      userId,
      isUse: false,
    });

    return {
      totalCount,
      items,
    };
  }

  async find(filter: FindManyOptions<History>) {
    return this.commonService.find(filter);
  }

  async count(filter: FindOptionsWhere<History>) {
    return this.commonService.count(filter);
  }

  async insert(dto: HistoryDTO) {
    const entity = new History();
    Object.assign(entity, dto);
    return this.commonService.insert(entity);
  }
}
