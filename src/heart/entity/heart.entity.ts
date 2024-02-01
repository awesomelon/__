import { CommonEntity } from 'src/common/entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { HeartItem } from './heartItem.entity';

@Entity()
export class Heart extends CommonEntity {
  @Index()
  @Column({ type: 'int', nullable: false })
  userId: number;

  @OneToMany(() => HeartItem, (heartItem) => heartItem.heart)
  heartItems: HeartItem[];
}
