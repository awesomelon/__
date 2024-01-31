import { ApiProperty } from '@nestjs/swagger';

export class RequestCreateHeartDTO {
  @ApiProperty({ required: true, description: 'Heart Amount' })
  amount: number;
}
