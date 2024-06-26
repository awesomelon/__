// auth
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// Guard
import { JwtAuthGuard, LocalAuthGuard } from './guard';

// DTO
import { RequestLoginDTO, ResponseLoginDTO, ResponseProfile } from './dto';

// auth
import { AuthService } from './auth.service';

// Common
import { RolesGuard } from 'src/common/guard';
import { Roles } from 'src/common/decorator';
import { RolesType } from 'src/common/enum';
import { ResponseError } from 'src/common/dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Version('1')
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: RequestLoginDTO })
  @ApiCreatedResponse({ type: ResponseLoginDTO })
  async login(@Body() body: RequestLoginDTO) {
    return this.service.login(body);
  }

  @Version('1')
  @Get('/profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles([RolesType.ADMIN, RolesType.USER])
  @ApiOperation({ summary: '잔여 하트 조회' })
  @ApiCreatedResponse({ type: ResponseProfile })
  @ApiBadRequestResponse({ status: '5XX', type: ResponseError })
  async getProfile(@Request() req) {
    return this.service.getProfile(req);
  }
}
