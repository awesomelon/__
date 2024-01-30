// core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { HelloBotUser } from './entity';

// lib
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(HelloBotUser)
    private usersRepository: Repository<HelloBotUser>,
  ) {}

  async findOne(
    filter: FindOneOptions<HelloBotUser>,
  ): Promise<HelloBotUser | null> {
    return this.usersRepository.findOne(filter);
  }

  async exists(filter: FindManyOptions<HelloBotUser>): Promise<boolean> {
    const exists = await this.usersRepository.exists(filter);
    if (exists) {
      return true;
    }

    return false;
  }
}
