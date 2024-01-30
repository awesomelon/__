// auth
import { Body, Controller, Post, UseGuards, Version } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// Guard
import { LocalAuthGuard } from './guard';

// DTO
import { RequestLoginDTO, ResponseLoginDTO } from './dto';

// auth
import { AuthService } from './auth.service';

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
}
