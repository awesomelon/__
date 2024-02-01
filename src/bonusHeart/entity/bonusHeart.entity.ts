import { CommonEntity } from 'src/common/entity';
import { Column, Entity, Index } from 'typeorm';

@Entity()
export class BonusHeart extends CommonEntity {
  @Column({ type: 'int', default: 0, nullable: false })
  totalAmount: number;

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
}
