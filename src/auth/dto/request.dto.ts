// core
import { ApiProperty } from '@nestjs/swagger';

// lib
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestLoginDTO {
  @ApiProperty({ default: 'admin@thigsflow.com', description: '유저 이메일' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ default: '1234', description: '유저 패스워드' })
  @IsNotEmpty()
  readonly password: string;
}
