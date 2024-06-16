import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BaseEntity,
  OneToOne,
  DeleteDateColumn
} from 'typeorm';

import { User } from './user.entity';
import { Bank } from './bank.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserBank extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne(() => User, {
    onDelete: 'CASCADE'
  })
  public user!: User;

  @ManyToOne(() => Bank, {
    onDelete: 'CASCADE'
  })
  public bank!: Bank;

  @Column({ type: 'varchar' })
  public account_number!: string;

  @Column({ type: 'varchar' })
  public account_name!: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deleted_at: Date | null;
}
