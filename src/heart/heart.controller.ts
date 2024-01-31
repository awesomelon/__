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

// Heart
import { HeartService } from './heart.service';
import { RequestChargingHeartDTO, ResponseHeartDTO } from './dto';

// auth
import { JwtAuthGuard } from 'src/auth/guard';

// common
import { Roles } from 'src/common/decorator';
import { RolesGuard } from 'src/common/guard';
import { RolesType } from 'src/common/enum';

@ApiTags('Heart')
@Controller('api/heart')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HeartController {
  constructor(private readonly service: HeartService) {}

  @Version('1')
  @Post('/charging')
  @ApiBearerAuth()
  @Roles([RolesType.ADMIN, RolesType.USER])
  @ApiOperation({ summary: '일반 하트 충전' })
  @ApiBody({ type: RequestChargingHeartDTO })
  @ApiCreatedResponse({ type: ResponseHeartDTO })
  async charging(@Body() body: RequestChargingHeartDTO, @Request() req) {
    return this.service.charging(body, req.user.id);
  }
}
