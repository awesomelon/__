// core
import { Body, Controller, Get, UseGuards, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('api/user')
@UseGuards(JwtAuthGuard)
export class CommonHeartController {
  constructor(private readonly service: UserService) {}

  @Version('1')
  @ApiBearerAuth()
  @ApiOperation({ summary: '유저 정보 조회' })
  @Get('/profile')
  async get() {
    return 'Ok';
  }
}
