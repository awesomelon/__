import { ApiProperty } from '@nestjs/swagger';
import { ResponseCommon } from 'src/common/dto';

export class ResponseHistoryItem extends ResponseCommon {
  @ApiProperty({ required: true, description: 'History ID' })
  id: number;

  @ApiProperty({ required: true, description: '충전 및 사용 하트수' })
  amount: number;

  @ApiProperty({ required: true, description: 'User ID' })
  userId: number;

  @ApiProperty({ required: false, description: 'Admin ID' })
  adminId?: number;

  @ApiProperty({ required: true, description: 'Heart Type' })
  type: string;

  @ApiProperty({ required: false, description: '보너스 하트 사용 시작 기간' })
  expiredStartAt?: Date;

  @ApiProperty({ required: false, description: '보너스 하트 사용 종료 기간' })
  expiredEndAt?: Date;

  @ApiProperty({ required: true, description: '하트 사용 여부' })
  isUse: boolean;
}

export class ResponseHistory {
  @ApiProperty({
    type: ResponseHistoryItem,
    required: true,
    description: 'History List',
    isArray: true,
  })
  items: ResponseHistoryItem[];

  @ApiProperty({ required: true, description: 'History Count' })
  totalCount: number;
}
