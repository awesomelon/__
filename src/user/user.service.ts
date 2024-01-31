// core
import { Injectable } from '@nestjs/common';

// HelloBotUser
import { HelloBotUser } from './entity';

// common
import { CommonService } from 'src/common/service/common.service';

// lib
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly commonService: CommonService<HelloBotUser>) {}

  async findOne(filter: FindOneOptions<HelloBotUser>) {
    return this.commonService.findOne(filter);
  }

  async exists(filter: FindManyOptions<HelloBotUser>) {
    return this.commonService.exists(filter);
  }
}
