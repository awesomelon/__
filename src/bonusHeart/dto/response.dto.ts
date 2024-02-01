import { ApiProperty } from '@nestjs/swagger';
import { ResponseCommon } from 'src/common/dto';

export class ResponseHeartDTO extends ResponseCommon {
  @ApiProperty({ required: true, description: 'Heart ID' })
  id: number;

  @ApiProperty({ required: true, description: '일반 하트 총량' })
  amount: number;

  @ApiProperty({ required: true, description: 'User ID' })
  userId: number;

  @ApiProperty({ required: true, description: 'Admin ID' })
  adminId: number;
}
