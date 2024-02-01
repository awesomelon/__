import { ApiProperty } from '@nestjs/swagger';

export class RequestListCommon<T> {
  @ApiProperty({ default: 0, description: 'Skip' })
  skip: number;

  @ApiProperty({ default: 10, description: 'Limit' })
  limit: number;
}
