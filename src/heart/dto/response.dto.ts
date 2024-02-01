import { ApiProperty } from '@nestjs/swagger';
import { ResponseCommon } from 'src/common/dto';

export class ResponseHeartDTO extends ResponseCommon {
  @ApiProperty({ required: true, description: '일반 Heart ID' })
  id: number;

  @ApiProperty({ required: true, description: '일반 하트 보유량' })
  amount: number;

  @ApiProperty({ required: true, description: '유저 ID' })
  userId: number;
}
