// core
import { Body, Controller, Post, UseGuards, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CommonHeartService } from './commonHeart.service';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard';
import { RolesType } from 'src/roles/roles.enum';

@ApiTags('CommonHeart')
@Controller('api/commonHeart')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommonHeartController {
  constructor(private readonly service: CommonHeartService) {}

  @Version('1')
  @ApiBearerAuth()
  @Roles([RolesType.ADMIN, RolesType.USER])
  @ApiOperation({ summary: '일반 하트 충전' })
  @Post('')
  async get() {
    return 'Ok';
  }
}
