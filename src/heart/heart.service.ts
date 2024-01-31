import { Injectable } from '@nestjs/common';

import { Heart } from './entity';
import { RequestCreateHeartDTO } from './dto';

// common
import { CommonService } from 'src/common/service/common.service';

// lib
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class HeartService {
  constructor(private readonly commonService: CommonService<Heart>) {}

  async sum(filter: FindOptionsWhere<Heart>) {
    return this.commonService.sum(filter, 'amount');
  }

  async insert(heart: RequestCreateHeartDTO, userId: number, manager) {
    const data = {
      ...heart,
      userId,
    };

    return manager.getRepository(Heart).save(data);
  }
}
