import { ApiProperty } from '@nestjs/swagger';
import { RequestListCommon } from 'src/common/dto';
import { FindManyOptions } from 'typeorm';
import { History } from '../entity';

export class HistoryDTO {
  @ApiProperty({ required: true, description: '하트 사용량' })
  amount: number;

  @ApiProperty({ required: true, description: 'User ID' })
  userId: number;

  @ApiProperty({ required: false, description: 'Admin ID' })
  adminId?: number;

  @ApiProperty({ required: true, description: 'History Type' })
  type: string;

  @ApiProperty({ required: true, description: 'History Description' })
  isUse: boolean;

  @ApiProperty({ required: false, description: 'Expired Start' })
  expiredStartAt?: Date;

  @ApiProperty({ required: false, description: 'Expired End' })
  expiredEndAt?: Date;
}

export class RequestHistoryDTO extends RequestListCommon<
  FindManyOptions<History>
> {}
