import { ApiProperty, PickType } from '@nestjs/swagger';
import { ResponseCommon } from 'src/common/dto';

export class ResponseUserItemDTO extends ResponseCommon {
  @ApiProperty({ required: true, description: '유저 ID' })
  id: number;

  @ApiProperty({ required: true, description: '유저 이메일' })
  email: string;

  @ApiProperty({ required: true, description: '유저 권한' })
  role: number;
}
