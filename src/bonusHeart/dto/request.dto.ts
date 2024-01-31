import { ApiProperty } from '@nestjs/swagger';

export class RequestCreateBonusHeartDTO {
  @ApiProperty({ required: true, description: 'Heart Bonus Amount' })
  amount: number;

  @ApiProperty({ required: true, description: 'User ID' })
  userId: number;

  @ApiProperty({ required: true, description: 'Expired Start' })
  expiredStartAt: Date;

  @ApiProperty({ required: true, description: 'Expired End' })
  expiredEndAt: Date;
}
