import { ApiProperty, PickType } from '@nestjs/swagger';

export class BonusHeartDTO {
  @ApiProperty({ required: true, description: 'Heart Bonus Amount' })
  amount: number;

  @ApiProperty({ required: true, description: 'User ID' })
  userId: number;

  @ApiProperty({ required: true, description: 'Expired Start' })
  expiredStartAt: Date;

  @ApiProperty({ required: true, description: 'Expired End' })
  expiredEndAt: Date;
}

export class RequestChargingBonusHeartDTO extends PickType(BonusHeartDTO, [
  'amount',
  'userId',
  'expiredStartAt',
  'expiredEndAt',
]) {}

export class RequestUseBonusHeartDTO extends PickType(BonusHeartDTO, [
  'amount',
  'userId',
]) {}
