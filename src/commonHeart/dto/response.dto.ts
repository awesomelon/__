import { ApiProperty } from '@nestjs/swagger';
import { ResponseCommon } from 'src/common/dto';

export class ResponseCommHeartItemDTO extends ResponseCommon {
  @ApiProperty({ required: true, description: 'Common Heart ID' })
  id: number;

  @ApiProperty({ required: true, description: 'Heart Count' })
  heart: number;
}
