import { CommonEntity } from 'src/common/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class History extends CommonEntity {
  @Column({ type: 'int', default: 0, nullable: false })
  amount: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'int', nullable: true })
  adminId: number;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'timestamptz', nullable: true })
  expiredStartAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  expiredEndAt: Date;

  @Column({ type: 'boolean', nullable: false })
  isUse: boolean;
}
