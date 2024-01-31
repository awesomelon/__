// lib
import { IsBoolean, IsDate } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDate()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @IsDate()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updatedAt: Date;

  @IsBoolean()
  @Column({ default: false })
  isDeleted: boolean;
}
