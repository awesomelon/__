// core
import { ApiProperty } from '@nestjs/swagger';

// lib
import { IsNotEmpty } from 'class-validator';

export class RequestLoginDTO {
  @ApiProperty({ default: 'admin@thigsflow.com' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ default: '1234' })
  @IsNotEmpty()
  readonly password: string;
}
