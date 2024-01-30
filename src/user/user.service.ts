import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { HelloBotUser } from './entity';
import { CommonHeartService } from 'src/commonHeart/commonHeart.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commonHeartService: CommonHeartService,
  ) {}

  async findOne(filter: FindOneOptions<HelloBotUser>) {
    return this.userRepository.findOne(filter);
  }

  async exists(filter: FindManyOptions<HelloBotUser>) {
    return this.userRepository.exists(filter);
  }

  async getProfile(req) {
    const email = req.user.email;
    const user = await this.findOne({
      where: { email },
      select: ['email', 'role', 'id'],
    });

    const commonHeart = await this.commonHeartService.sum({
      userId: user.id,
    });

    return {
      ...user,
      commonHeart,
    };
  }
}
