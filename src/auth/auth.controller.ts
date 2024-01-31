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
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// Guard
import { JwtAuthGuard, LocalAuthGuard } from './guard';

// DTO
import { RequestLoginDTO, ResponseLoginDTO } from './dto';

// auth
import { AuthService } from './auth.service';
import { RolesGuard } from 'src/common/guard';
import { Roles } from 'src/common/decorator';
import { RolesType } from 'src/common/enum';

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
  async get(@Request() req) {
    return this.service.getProfile(req);
  }
}
