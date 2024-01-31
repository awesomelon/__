import { IsEmail } from 'class-validator';
import { CommonEntity } from 'src/common/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class HelloBotUser extends CommonEntity {
  @Column({ unique: true, type: 'varchar', length: 255, nullable: false })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ default: 1, comment: '0: admin, 1: user', nullable: false })
  role: number;
}
