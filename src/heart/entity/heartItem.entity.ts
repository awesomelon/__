import { CommonEntity } from 'src/common/entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Entity()
export class HeartItem extends CommonEntity {
  @Column({ type: 'int', default: 0, nullable: false })
  amount: number;

  @Index()
  @Column({ type: 'int', nullable: false })
  heartId: number;
}
