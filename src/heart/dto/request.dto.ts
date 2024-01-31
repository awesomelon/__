import { ApiProperty, PickType } from '@nestjs/swagger';

export class HeartDTO {
  @ApiProperty({ required: true, description: 'Heart Amount' })
  totalAmount: number;

  @ApiProperty({ required: true, description: 'Heart Use' })
  isUse: boolean;

  @ApiProperty({ required: true, description: 'User Id' })
  userId: number;
}

export class RequestChargingHeartDTO {
  @ApiProperty({ required: true, description: 'Heart Amount' })
  amount: number;
}
export class RequestUseHeartDTO {
  @ApiProperty({ required: true, description: 'Heart Amount' })
  amount: number;
}

export class HeartItemDTO {
  @ApiProperty({ required: true, description: 'Heart Item Amount' })
  amount: number;

  @ApiProperty({ required: true, description: 'Heart Item Id' })
  heartId: number;
}
