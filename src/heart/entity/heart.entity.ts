import { CommonEntity } from 'src/common/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Heart extends CommonEntity {
  @Column({ type: 'int', default: 0, nullable: false })
  amount: number;

  @Column({ type: 'int', nullable: false })
  userId: number;
}
