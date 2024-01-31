import { ApiProperty, PickType } from '@nestjs/swagger';

export class HeartDTO {
  @ApiProperty({ required: true, description: 'Heart Amount' })
  amount: number;

  @ApiProperty({ required: true, description: 'Heart Use' })
  isUse: boolean;

  @ApiProperty({ required: true, description: 'User Id' })
  userId: number;
}

export class RequestChargingHeartDTO extends PickType(HeartDTO, ['amount']) {}
export class RequestUseHeartDTO extends PickType(HeartDTO, ['amount']) {}
