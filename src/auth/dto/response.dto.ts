// core
import { ApiProperty } from '@nestjs/swagger';

// lib
import { IsNumber, IsString } from 'class-validator';

export class ResponseLoginDTO {
  @ApiProperty({ description: 'ACCESS TOKEN' })
  @IsString()
  access_token: string;
}

export class ResponseProfile {
  @ApiProperty({ description: '유저 ID' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '유저 이메일' })
  @IsString()
  email: string;

  @ApiProperty({ description: '유저 권한' })
  @IsNumber()
  role: number;

  @ApiProperty({ description: '유저 보유 하트' })
  @IsNumber()
  heart: number;
}
