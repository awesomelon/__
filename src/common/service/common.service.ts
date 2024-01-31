import { Injectable } from '@nestjs/common';

import {
  DataSource,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { PickKeysByType } from 'typeorm/common/PickKeysByType';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class CommonService<T> {
  constructor(
    private readonly genericRepository: Repository<T>,
    private readonly dataSource: DataSource,
  ) {}

  async find(filter: FindManyOptions<T>): Promise<T[]> {
    return this.genericRepository.find(filter);
  }

  async findOne(filter: FindOneOptions<T>): Promise<T | null> {
    return this.genericRepository.findOne(filter);
  }

  async count(filter: FindOptionsWhere<T>): Promise<number> {
    return this.genericRepository.count(filter);
  }

  async updateOne(
    filter: FindOptionsWhere<T>,
    data: QueryDeepPartialEntity<T>,
  ) {
    await this.genericRepository.update(filter, data);
    return this.genericRepository.findOne({ where: filter });
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

  async insert(data: T) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.manager.save<T>(data);
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
