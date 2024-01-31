// core
import { Injectable } from '@nestjs/common';

// History
import { History } from './entity';
import { HistoryDTO, RequestHistoryDTO } from './dto';

// Common
import { CommonService } from 'src/common/service/common.service';

// lib
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(private readonly commonService: CommonService<History>) {}

  async list(filter: RequestHistoryDTO, userId: number) {
    const items = await this.getItems(filter, userId);
    const totalCount = await this.getTotalCount(userId);

    return {
      totalCount,
      items,
    };
  }

  async getItems(filter: RequestHistoryDTO, userId: number) {
    return this.find({
      where: {
        userId,
        isUse: false,
      },
      skip: filter.skip,
      take: filter.limit,
      order: { createdAt: 'DESC' },
    });
  }

  async getTotalCount(userId: number) {
    return this.count({
      userId,
      isUse: false,
    });
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
