import { CommonEntity } from 'src/common/entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class Heart extends CommonEntity {
  @Column({ type: 'int', nullable: false, default: 0 })
  totalAmount: number;

  @Index()
  @Column({ type: 'int', nullable: false })
  userId: number;
}
