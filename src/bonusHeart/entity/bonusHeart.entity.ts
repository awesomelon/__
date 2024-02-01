import { CommonEntity } from 'src/common/entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BonusHeartItem } from './bonusHeartItem.entity';

@Entity()
export class BonusHeart extends CommonEntity {
  @Index()
  @Column({ type: 'int', nullable: false })
  userId: number;

  @Index()
  @Column({ type: 'int', nullable: false })
  adminId: number;

  @Index()
  @Column({ type: 'timestamptz', nullable: false })
  expiredStartAt: Date;

  @Index()
  @Column({ type: 'timestamptz', nullable: false })
  expiredEndAt: Date;

  @OneToMany(
    () => BonusHeartItem,
    (bonusHeartItem) => bonusHeartItem.bonusHeart,
  )
  bonusHeartItems: BonusHeartItem[];
}
