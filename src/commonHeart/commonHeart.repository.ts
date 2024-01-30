// core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CommonHeart } from './entity';

// lib
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class CommonHeartRepository {
  constructor(
    @InjectRepository(CommonHeart)
    private commonHeartRepository: Repository<CommonHeart>,
  ) {}

  async sum(filter: FindOptionsWhere<CommonHeart>) {
    return this.commonHeartRepository.sum('heart', filter);
  }
}
