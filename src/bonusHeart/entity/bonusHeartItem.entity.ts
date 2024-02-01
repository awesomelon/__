import { CommonEntity } from 'src/common/entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { BonusHeart } from './bonusHeart.entity';

@Entity()
export class BonusHeartItem extends CommonEntity {
  @Column({ type: 'int', default: 0, nullable: false })
  amount: number;

  @Index()
  @Column({ type: 'int', nullable: false })
  bonusHeartId: number;

  @ManyToOne(() => BonusHeart, (heart) => heart.bonusHeartItems)
  bonusHeart: BonusHeart;
}
