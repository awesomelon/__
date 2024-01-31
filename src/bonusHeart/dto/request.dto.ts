import { ApiProperty, PickType } from '@nestjs/swagger';

export class BonusHeartDTO {
  @ApiProperty({ required: true, description: 'Heart Bonus Amount' })
  totalAmount: number;

  @ApiProperty({ required: true, description: 'User ID' })
  userId: number;

  @ApiProperty({ required: true, description: 'Expired Start' })
  expiredStartAt: Date;

  @ApiProperty({ required: true, description: 'Expired End' })
  expiredEndAt: Date;
}

export class RequestChargingBonusHeartDTO extends PickType(BonusHeartDTO, [
  'expiredStartAt',
  'expiredEndAt',
  'userId',
]) {
  @ApiProperty({ required: true, description: 'Heart Amount' })
  amount: number;
}

export class RequestUseBonusHeartDTO extends PickType(BonusHeartDTO, [
  'userId',
]) {
  @ApiProperty({ required: true, description: 'Heart Amount' })
  amount: number;
}

export class BonusHeartItemDTO {
  @ApiProperty({ required: true, description: 'Heart Item Amount' })
  amount: number;

  @ApiProperty({ required: true, description: 'Heart Item Id' })
  bonusHeartId: number;
}
