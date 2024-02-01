// core
import {
  Body,
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

// History
import { RequestHistoryDTO, ResponseHistory } from './dto';
import { HistoryService } from './history.service';

// auth
import { JwtAuthGuard } from 'src/auth/guard';

// common
import { Roles } from 'src/common/decorator';
import { RolesGuard } from 'src/common/guard';
import { RolesType } from 'src/common/enum';

@ApiTags('History')
@Controller('api/history')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HistoryController {
  constructor(private readonly service: HistoryService) {}

  @Version('1')
  @Get('')
  @ApiBearerAuth()
  @Roles([RolesType.USER])
  @ApiOperation({ summary: '하트 충전 내역 조회' })
  @ApiQuery({ type: RequestHistoryDTO })
  @ApiCreatedResponse({ type: ResponseHistory })
  async list(@Query('skip') skip, @Query('limit') limit, @Request() req) {
    return this.service.list({ skip, limit }, req.user.id);
  }
}
