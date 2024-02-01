import { ApiProperty, PickType } from '@nestjs/swagger';

export class BonusHeartDTO {
  @ApiProperty({ required: true, description: '보너스 하트 총량' })
  totalAmount: number;

  @ApiProperty({ required: true, description: '관리자 ID' })
  adminId: number;

  @ApiProperty({ required: true, description: '유저 ID' })
  userId: number;

  @ApiProperty({ required: true, description: '유효 시작 기간' })
  expiredStartAt: Date;

  @ApiProperty({ required: true, description: '유효 종료 기간' })
  expiredEndAt: Date;
}

export class RequestChargingBonusHeartDTO extends PickType(BonusHeartDTO, [
  'expiredStartAt',
  'expiredEndAt',
  'userId',
]) {
  @ApiProperty({ required: true, description: '보너스 하트 충전량' })
  amount: number;
}

export class RequestUseBonusHeartDTO extends PickType(BonusHeartDTO, [
  'userId',
]) {
  @ApiProperty({ required: true, description: '보너스 하트 사옹량' })
  amount: number;
}

export class BonusHeartItemDTO {
  @ApiProperty({ required: true, description: '충전 및 사용 하트 수' })
  amount: number;

  @ApiProperty({ required: true, description: 'Bonus Heart Item Id' })
  bonusHeartId: number;
}
