// core
import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
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
import { RequestCreateBonusHeartDTO, ResponseHeartDTO } from './dto';

// auth
import { JwtAuthGuard } from 'src/auth/guard';

// common
import { EntityManager, Roles } from 'src/common/decorator';
import { RolesGuard } from 'src/common/guard';
import { RolesType } from 'src/common/enum';
import { TransactionInterceptor } from 'src/common/interceptor';

@ApiTags('Bonus Heart')
@Controller('api/bonusheart')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BonusHeartController {
  constructor(private readonly service: BonusHeartService) {}

  @Version('1')
  @Post('/charging')
  @UseInterceptors(TransactionInterceptor)
  @ApiBearerAuth()
  @Roles([RolesType.ADMIN])
  @ApiOperation({ summary: '보너스 하트 충전' })
  @ApiBody({ type: RequestCreateBonusHeartDTO })
  @ApiCreatedResponse({ type: ResponseHeartDTO })
  async charging(
    @Body() body: RequestCreateBonusHeartDTO,
    @Request() req,
    @EntityManager() manager,
  ) {
    return this.service.charging(body, req.user.id, manager);
  }
}