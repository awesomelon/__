import { ApiProperty } from '@nestjs/swagger';

export class ResponseCommon {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
