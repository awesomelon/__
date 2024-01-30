// core
import { ApiProperty } from '@nestjs/swagger';

// lib
import { IsString } from 'class-validator';

export class ResponseLoginDTO {
  @ApiProperty()
  @IsString()
  access_token: string;
}
