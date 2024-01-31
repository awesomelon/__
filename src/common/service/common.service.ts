import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { PickKeysByType } from 'typeorm/common/PickKeysByType';

@Injectable()
export class CommonService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async findOne(filter: FindOneOptions<T>): Promise<T | null> {
    return this.genericRepository.findOne(filter);
  }

  async sum(
    filter: FindOptionsWhere<T>,
    columnName: PickKeysByType<T, number>,
  ): Promise<number> {
    return this.genericRepository
      .sum(columnName, filter)
      .then((value) => value || 0);
  }

  async exists(filter: FindManyOptions<T>): Promise<boolean> {
    const exists = await this.genericRepository.exists(filter);
    if (exists) {
      return true;
    }

    return false;
  }
}
