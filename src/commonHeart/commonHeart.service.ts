import { Injectable } from '@nestjs/common';

import { CommonHeartRepository } from './commonHeart.repository';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';
import { CommonHeart } from './entity';

@Injectable()
export class CommonHeartService {
  constructor(private readonly commonHeartRepository: CommonHeartRepository) {}

  async sum(filter: FindOptionsWhere<CommonHeart>) {
    return this.commonHeartRepository.sum(filter) || 0;
  }
}
