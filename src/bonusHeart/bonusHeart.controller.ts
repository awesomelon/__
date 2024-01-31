// core
import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { BonusHeartService } from './bonusHeart.service';
import { RequestChargingBonusHeartDTO, ResponseHeartDTO } from './dto';

// auth
import { JwtAuthGuard } from 'src/auth/guard';

// common
import { Roles } from 'src/common/decorator';
import { RolesGuard } from 'src/common/guard';
import { RolesType } from 'src/common/enum';

@ApiTags('Heart')
@Controller('api/heart')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BonusHeartController {
  constructor(private readonly service: BonusHeartService) {}

  @Version('1')
  @Post('/bonus/charging')
  @ApiBearerAuth()
  @Roles([RolesType.ADMIN])
  @ApiOperation({ summary: '보너스 하트 충전' })
  @ApiBody({ type: RequestChargingBonusHeartDTO })
  @ApiCreatedResponse({ type: ResponseHeartDTO })
  async charging(@Body() body: RequestChargingBonusHeartDTO, @Request() req) {
    return this.service.charging(body, req.user.id);
  }
}
