import { ApiProperty, PickType } from '@nestjs/swagger';
import { ResponseCommon } from 'src/common/dto';

export class ResponseUserItemDTO extends ResponseCommon {
  @ApiProperty({ required: true, description: 'User ID' })
  id: number;

  @ApiProperty({ required: true, description: 'User Email' })
  email: string;

  @ApiProperty({ required: true, description: 'User Role' })
  role: number;
}
