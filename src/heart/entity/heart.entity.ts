import { CommonEntity } from 'src/common/entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { HeartItem } from './heartItem.entity';

@Entity()
export class Heart extends CommonEntity {
  @Column({ type: 'int', nullable: false, default: 0 })
  totalAmount: number;

  @Column({ type: 'int', nullable: false })
  userId: number;
}
