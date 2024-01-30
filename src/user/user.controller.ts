// core
import { Controller, Get, Request, UseGuards, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('api/user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Version('1')
  @ApiBearerAuth()
  @ApiOperation({ summary: '일반 하트 충전' })
  @Get('/profile')
  async get(@Request() req) {
    return this.service.getProfile(req);
  }
}
