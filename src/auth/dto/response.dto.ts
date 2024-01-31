// core
import { ApiProperty } from '@nestjs/swagger';

// lib
import { IsNumber, IsString } from 'class-validator';

export class ResponseLoginDTO {
  @ApiProperty()
  @IsString()
  access_token: string;
}

export class ResponseProfile {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNumber()
  role: number;

  @ApiProperty()
  @IsNumber()
  heart: number;
}
