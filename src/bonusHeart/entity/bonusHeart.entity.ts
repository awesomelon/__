import { CommonEntity } from 'src/common/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class BonusHeart extends CommonEntity {
  @Column({ type: 'int', default: 0, nullable: false })
  amount: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: false })
  adminId: number;

  @Column({ type: 'boolean', nullable: false })
  isUse: boolean;

  @Column({ type: 'timestamptz', nullable: false })
  expiredStartAt: Date;

  @Column({ type: 'timestamptz', nullable: false })
  expiredEndAt: Date;
}
