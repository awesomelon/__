// core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// User
import { CommonHeartService } from './commonHeart.service';
import { CommonHeartRepository } from './commonHeart.repository';
import { CommonHeartController } from './commonHeart.controller';
import { CommonHeart } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommonHeart])],
  controllers: [CommonHeartController],
  providers: [CommonHeartService, CommonHeartRepository],
  exports: [CommonHeartService],
})
export class CommonHeartModule {}
