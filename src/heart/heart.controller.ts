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

import { HeartService } from './heart.service';
import { RequestCreateHeartDTO, ResponseHeartDTO } from './dto';

// auth
import { JwtAuthGuard } from 'src/auth/guard';

// common
import { EntityManager, Roles } from 'src/common/decorator';
import { RolesGuard } from 'src/common/guard';
import { RolesType } from 'src/common/enum';
import { TransactionInterceptor } from 'src/common/interceptor';

@ApiTags('Heart')
@Controller('api/heart')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HeartController {
  constructor(private readonly service: HeartService) {}

  @Version('1')
  @Post('/charging')
  @UseInterceptors(TransactionInterceptor)
  @ApiBearerAuth()
  @Roles([RolesType.ADMIN, RolesType.USER])
  @ApiOperation({ summary: '일반 하트 충전' })
  @ApiBody({ type: RequestCreateHeartDTO })
  @ApiCreatedResponse({ type: ResponseHeartDTO })
  async charging(
    @Body() body: RequestCreateHeartDTO,
    @Request() req,
    @EntityManager() manager,
  ) {
    return this.service.insert(body, req.user.id, manager);
  }
}
