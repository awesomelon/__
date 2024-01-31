import { ApiProperty } from '@nestjs/swagger';

export class RequestListCommon<T> {
  @ApiProperty({ default: 0 })
  skip: number;

  @ApiProperty({ default: 10 })
  limit: number;
}
