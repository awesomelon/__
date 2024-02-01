import { ApiProperty, PickType } from '@nestjs/swagger';

export class HeartDTO {
  @ApiProperty({ required: true, description: '일반 하트 총량' })
  totalAmount: number;

  @ApiProperty({ required: true, description: '유저 ID' })
  userId: number;
}

export class RequestChargingHeartDTO {
  @ApiProperty({ required: true, description: '일반 하트 충전량' })
  amount: number;
}
export class RequestUseHeartDTO {
  @ApiProperty({ required: true, description: '일반 하트 사용량' })
  amount: number;
}

export class HeartItemDTO {
  @ApiProperty({ required: true, description: '하트 충전 및 사용량' })
  amount: number;

  @ApiProperty({ required: true, description: 'Heart Item Id' })
  heartId: number;
}
